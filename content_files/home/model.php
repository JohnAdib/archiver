<?php
namespace content_files\home;
use \lib\debug;
use \lib\utility;
class model extends \mvc\model
{
	/**
	 * get the location of file and check it with referer then
	 * if correct pass the complete location contain uid
	 * @return [type] [description]
	 */
	private function getLocation($_location = false)
	{
		// var_dump($_location);
		if($_location === false)
		{
			$_location = utility::post('location');
			if(!empty($_location) && strpos($_SERVER['HTTP_REFERER'], $_location) === false)
			{
				debug::property('status', 'fail');
				debug::property('error', T_('Fail on get current location'). $_location);

				$this->_processor(['force_json'=>true, 'not_redirect'=>true]);
				return false;
			}
			elseif($_location === null)
			{
				$_location = $this->url('path');
			}
		}

		$uid = $this->login('id');
		$_location = '/'. $uid.'/'. $_location;
		// var_dump(htmlspecialchars($_location));

		return $_location;
	}


	/**
	 * get items send via js then decode and return it
	 * @return [type] [description]
	 */
	private function getItems($_raw = false)
	{
		$items = utility::post('items');

		$items = explode(',', $items);
		if(count($items) < 1)
		{
			return false;
		}

		$myIDs = array();
		foreach($items as $item)
		{
			$myIDs[] = utility\ShortURL::decode($item);
		}

		if($_raw)
		{
			return implode($myIDs, ', ');
		}
		// if contain one element pass it in string
		elseif(is_array($_raw) && count($_raw) == 1  &&  isset($myIDs[0]))
		{
			return $myIDs[0];
		}

		return $myIDs;
	}


	/**
	 * create a start of query for current item to use in another functions
	 * @param  [type]  $_need   pass your need in array and we process it
	 * @param  boolean $_id  	pass the id of item manually
	 * @param  boolean $_order  pass the field and type of order
	 * @param  boolean $_status pass status that want it
	 * @return [type]           return the sql object for nex step
	 */
	private function qryCreator($_need, $_id = false, $_order = false, $_status = false)
	{
		// add current user to query string
		$uid       = $this->login('id');
		if(!$uid)
			return false;
		// get location
		$myLocation = $this->getLocation();
		if(!$myLocation)
			return false;



		// --------------------------------------------------------- user_id
		$myQry = $this->sql()
						->table('attachments')
						->where('user_id', $uid);

		// --------------------------------------------------------- attachment_addr
		// add location to query string
		if(in_array('location', $_need))
		{
			$myQry = $myQry->and('attachment_addr', $myLocation);
		}

		// --------------------------------------------------------- attachment_fav
		// add favorites to query string
		if(in_array('fav', $_need))
		{
			$myQry = $myQry->and('attachment_fav', 1);
		}

		// --------------------------------------------------------- attachment_status
		// add status to query string
		if(in_array('status', $_need))
		{
			if(is_array($_status))
			{
				$_status = implode($_status, ',');
				$myQry = $myQry->and('attachment_status', 'IN', '('& $_status & ')');
			}
			else
			{
				$myQry = $myQry->and('attachment_status', 'IN', '("normal", "trash")');
			}
		}



		// --------------------------------------------------------- id
		// select with best selector for id
		// different for array and strings
		if(in_array('id', $_need))
		{
			if($_id)
			{
				$myQry = $myQry->and('id', $_id);
			}
			else
			{
				$myId = $this->getItems(true);
				// if only has one id
				if(is_numeric($myId))
				{
					$myQry = $myQry->and('id', $myId);
				}
				// if contain more than one id
				elseif($myId)
				{
					$myQry = $myQry->and('id', 'IN' ,"(".$myId.")");
				}
				// the id is not correct
				else
					return false;
			}
		}


		// --------------------------------------------------------- Search
		// create search query
		if(in_array('search', $_need))
		{
			/**
			Shwo unique result
			 */
			$q = utility::get('q');
			// $myQry = $myQry->and('MATCH(`attachment_name`, `attachment_meta`)', 'AGAINST' ,"('".$q."')");
			$myQry = $myQry->groupOpen('g_search');

			$myQry = $myQry->and("attachment_name", 'LIKE', "'%$q%'");
			$myQry = $myQry->or( "attachment_meta", 'LIKE', "'%$q%'");

			$myQry = $myQry->groupClose('g_search');


			// $myQry->join('attachmentmetas')->on('attachment_id', '#attachmentmeta.id')
				// ->and("attachmentmeta_key", 'LIKE', "'%$q%'");

				// ->and('termusage_foreign', '#"attachments"');

		}


		// --------------------------------------------------------- order by type
		// add order to query string if user needif
		if(in_array('order', $_need))
		{
			if(is_array($_order))
			{
				$myQry = $myQry->order('#'. key($_order[0]), $_order[0]);
			}
			else
			{
				$myQry = $myQry->order('#type', 'DESC');
			}
		}

		if(in_array('field', $_need))
		{
			$myQry = $myQry->field(
						'id',
						'file_id',
						'#attachment_title as title',
						'#attachment_desc as description',
						'#attachment_type as type',
						// '#attachment_addr as address',
						'#attachment_name as name',
						'#attachment_ext as ext',
						'#attachment_size as size',
						'#attachment_meta as meta',
						'#attachment_parent as parent',
						// '#attachment_order as order',
						'#attachment_fav as fav',
						'#attachment_status as status',
						'#attachment_date as date'
					);
		}

		return $myQry;
	}


	/**
	 * fetch list of items from database and retun it
	 * @return [array] datatable contain list of items
	 */
	public function draw()
	{
		$qry       = $this->qryCreator(['location', 'status', 'order', 'field']);
		$qry       = $qry->select('id');
		$datatable = $qry->allassoc();

		return $this->draw_fix($datatable);
	}


	/**
	 * fetch list of favorite items from database and retun it
	 * @return [array] datatable contain list of items
	 */
	public function draw_favorites()
	{
		$qry  = $this->qryCreator(['status', 'fav', 'field']);
		$qry = $qry->select()->allassoc();

		return $this->draw_fix($qry);
	}


	/**
	 * fetch list of favorite items from database and retun it
	 * @return [array] datatable contain list of items
	 */
	public function draw_tags()
	{
		/**
		for Show tags
		first we need to get current user, then join qry with terms and termusages tbl
		 */
		$qry = $this->sql()->table('terms')
			->where('term_type', 'tag')
			->field('id', '#term_title as title', '#term_url as url');


		$qry->join('termusages')->on('term_id', '#terms.id')
			->field('#id')
			// ->field('#count(*) as countuse')
			->and('termusage_foreign', '#"attachments"');
		// $qry    = $qry->groupby('term_id', '#ip');
			// ->and('termusage_id', $myId);

		// $qry  = $this->qryCreator(['status', 'fav', 'field']);
		// var_dump($qry->selectString());exit();
		$qry = $qry->select()->allassoc();
		return $qry;
	}

	function draw_search()
	{
		$qry  = $this->qryCreator(['status', 'search', 'field']);
		// var_dump($qry->selectString());exit();
		$qry = $qry->select()->allassoc();

		return $this->draw_fix($qry);
	}



	/**
	 * fix datatable for showing it
	 * @param  [type] $_dbtable [give datatable]
	 * @return [type]           [return fixed datatable]
	 */
	public function draw_fix($_dbtable)
	{
		foreach ($_dbtable as $key =>$row)
		{
			if(isset($row['meta']) && $row['meta'])
			{
				$_dbtable[$key]['meta']   = json_decode($row['meta'], true);
			}

			$_dbtable[$key]['cid']    = utility\ShortURL::encode($row['id']);
			$_dbtable[$key]['fav']    = $_dbtable[$key]['fav']? 'fa-star': 'fa-star-o';
			$_dbtable[$key]['status'] = $_dbtable[$key]['status'] == 'normal'? '': $_dbtable[$key]['status'];

			// set icon for items
			switch ($row['type'])
			{
				case 'folder':
					$_dbtable[$key]['icon'] = 'folder';
					break;

				case 'file':
					$_dbtable[$key]['icon'] = 'file-o';

					if(isset($_dbtable[$key]['meta']) &&
						isset($_dbtable[$key]['meta']['type']) &&
						$_dbtable[$key]['meta']['type'] !== 'file'
					)
						$_dbtable[$key]['icon'] = 'file-'.$_dbtable[$key]['meta']['type'].'-o';
					break;

				case 'system':
					$_dbtable[$key]['icon'] = 'hdd-o';
					break;

				case 'other':
					$_dbtable[$key]['icon'] = 'file';
					break;

				default:
					$_dbtable[$key]['icon'] = 'file-o';
					break;
			}
		}
		return $_dbtable;
	}


	/**
	 * doing upload process
	 * @return [boolean] if status is false, return it
	 */
	public function post_upload()
	{
		$_location = $this->getLocation();
		if(!$_location)
			return false;

		$FOLDER_SIZE = 1000;
		$SERVER_SIZE = 1000000;		// 1 milion file can save in each server
		$server_id   = 1;
		utility\Upload::$extentions = 'all';

		// 1. check upload process and validate it
		$invalid = utility\Upload::invalid('upfile', 100000000);
		if($invalid)
		{
			debug::property('status','fail');
			debug::property('error', $invalid);

			$this->_processor(['force_json'=>true, 'not_redirect'=>true]);
			return false;
		}


		// 2. Generate file_id, folder_id and url
		$qry_count     = $this->sql()->table('files')->select('id')->num();
		$folder_prefix = "data/";
		$folder_id     = ceil(($qry_count+1) / $FOLDER_SIZE);
		$folder_name   = $folder_prefix . $folder_id;
		$file_id       = $qry_count % $FOLDER_SIZE + 1;
		$file_ext      = utility\Upload::$fileExt;
		// $url_full      = "$folder_name/$file_id-" . utility\Upload::$fileFullName;
		$url_full      = "$folder_name/$file_id." . $file_ext;



		// 3. Check for record exist in db or not then if not exist transfer it to data folder
		$qry_count2    = $this->sql()->table('files')->where('file_code', utility\Upload::$fileMd5)->select('id');
		$file_exist    = false;
		if($qry_count2->num())
		{
			$file_exist = true;
			$new_file_id = $qry_count2->assoc('id');
			// $id = $qry_count2->assoc('id');
			// debug::property('status','ok');
			// $link = '<a target="_blank" href=/attachments/edit='. $id. '>'. T_('Duplicate - File exist').'</a>';
			// debug::property('error', $link);

			// $this->_processor(['force_json'=>true, 'not_redirect'=>true]);
			// return false;
		}
		else
		{
			// 3.5. transfer file to project folder with new name
			if(!utility\Upload::transfer($url_full, $folder_name))
			{
				debug::property('status', 'fail');
				debug::property('error', T_('Fail on tranfering file'));

				$this->_processor(['force_json'=>true, 'not_redirect'=>true]);
				return false;
			}

		}

		// 4. transfer file to project folder with new name
		$url_thumb = null;
		$url_file  = null;

		$extlen    = strlen(utility\Upload::$fileExt)+1;
		$url_file  = substr($url_full, 0, -$extlen);

		switch ($file_ext)
		{
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
				$url_thumb  = $url_file.'-thumb.'.utility\Upload::$fileExt;
				utility\Image::load($url_full);
				utility\Image::thumb(250, 250);
				utility\Image::save($url_thumb);
				break;

			default:
				break;

		}
		$url_file  = $url_file.'.'.utility\Upload::$fileExt;

		// 5. get filemeta data
		$file_meta = [
						'mime'   => utility\Upload::$fileMime,
						'type'   => utility\Upload::$fileType,
						'file'   => $url_file,
						'ext'    => $file_ext,
						'url'    => $url_full,
						'thumb'  => $url_thumb,
					 ];
		$page_url  = $file_meta['type'].'/'.substr($url_full, strlen($folder_prefix));

		if( strpos($file_meta['mime'], 'image') !== false)
			list($file_meta['width'], $file_meta['height'])= getimagesize($url_full);
		$file_meta = json_encode($file_meta);
		// var_dump($file_meta);exit();

		if(!$file_exist)
		{
			// 6. add uploaded file to files table in db
			$qry = $this->sql();
			$qry = $qry->table('files')
						->set('id',               $qry_count + 1)
						->set('file_server',      $server_id)
						->set('file_folder',      $folder_id)
						->set('file_code',        utility\Upload::$fileMd5)
						->set('file_size',        utility\Upload::$fileSize)
						->set('file_meta',        $file_meta)
						->set('file_status',      'ready')
						->set('file_createdate',  date('Y-m-d H:i:s'));
			$qry         = $qry->insert();
			$new_file_id = $qry->LAST_INSERT_ID();
		}


		// 7. add uploaded file record attachment table in db
		$current_url = $this->url('path');

		$qry = $this->sql();
		$qry = $qry->table('attachments')
					->set('file_id',           $new_file_id)
					->set('attachment_type',   'file')
					->set('attachment_addr',   $_location)
					->set('attachment_name',   utility\Upload::$fileName)
					->set('attachment_ext',    $file_ext)
					->set('attachment_size',   utility\Upload::$fileSize)
					->set('attachment_meta',   $file_meta)
					->set('attachment_status', 'normal')
					->set('attachment_date',   date('Y-m-d H:i:s'))
					->set('user_id',           $this->login('id'));
		$qry           = $qry->insert();
		$attachment_id = $qry->LAST_INSERT_ID();


		// // 7. add uploaded file record to db
		// $qry = $this->sql();
		// $qry = $qry->table('posts')
		// 			->set('post_title',       utility\Upload::$fileName)
		// 			->set('post_slug',        utility\Upload::$fileMd5)
		// 			->set('post_meta',        $file_meta)
		// 			->set('post_type',        'attachment')
		// 			->set('post_url',         $page_url)
		// 			->set('user_id',          $this->login('id'))
		// 			->set('post_status',      'draft')
		// 			->set('post_publishdate', date('Y-m-d H:i:s'));

		// $qry         = $qry->insert();
		// $post_new_id = $qry->LAST_INSERT_ID();






		// 8. commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function($_id, $_url)
		{
			debug::property('status', 'ok');
			// $link = '<a target="_blank" href=/attachments/edit='.$_id.'>'. T_('Edit').'</a>';
			// debug::property('edit', $link);

		}, $attachment_id, $page_url);

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			// remove file if has problem
		});

		$this->_processor(['force_json'=>true, 'not_redirect'=>true]);


		// var_dump('upload');
		// return false;
		# code...
	}

	/**
	 * create a new folder
	 * @return [type] [description]
	 */
	public function post_createfolder()
	{
		$_location = $this->getLocation();
		if(!$_location)
			return false;

		// var_dump('create new folder');
		// return;
		$fname        = utility::post('fname');
		// var_dump($fname);
		// exit();

		$qry = $this->sql();
		$qry = $qry->table('attachments')
					->set('attachment_type',   'folder')
					->set('attachment_addr',   $_location)
					->set('attachment_name',   $fname)
					->set('attachment_size',   0)
					->set('attachment_status', 'normal')
					->set('attachment_date',   date('Y-m-d H:i:s'))
					->set('user_id',           $this->login('id'));
		$qry           = $qry->insert();
		// $attachment_id = $qry->LAST_INSERT_ID();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function()
		{
			debug::property('status', 'ok');
			debug::true(T_("New folder created Successfully"));
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::true(T_("Error on createding new folder!"));
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			// remove file if has problem
		});
	}



	/**
	 * remove file and folders
	 * @return [type] [description]
	 */
	public function post_remove()
	{
		$qry   = $this->qryCreator(['id', 'location']);
		$shift = utility::post('shift');

		if($shift == 'true')
		{
			$qry = $qry->set('attachment_status', 'deleted');
		}
		else
		{
			$qry = $qry->set('attachment_status', '#CASE
				WHEN attachment_status = "normal" THEN "trash"
				WHEN attachment_status = "trash" THEN "deleted"
				END', 'aaa');
		}

		// var_dump($qry->updateString()); exit();
		$qry           = $qry->update();
		// $attachment_id = $qry->LAST_INSERT_ID();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function()
		{
			debug::true(T_("Delete Successfully"));
			debug::property('status', 'ok');
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Error: "));
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			// remove file if has problem
		});
	}


	/**
	 * paste file and folders to new location
	 * @return [type] [description]
	 */
	public function post_paste()
	{
		// if type is invalid, return false
		$qry = $this->qryCreator(['id', 'status']);
		$type  = utility::post('type');

		if($type === 'cut')
		{
			$_location = $this->getLocation();
			if(!$_location)
				return false;
			$qry = $qry->set('attachment_addr', $_location);
		}
		elseif($type === 'copy')
		{
			return;
			// INSERT INTO `TABLENAME` (`field2`, `field3`,… ) SELECT `field2`, `field3`,… FROM TABLENAME
		}
		else
			return;

		$qry = $qry->update();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function($_type)
		{
			debug::true(T_(ucfirst($_type)). ' '. T_("Successfully"));
			debug::property('status', 'ok');
		}, $type);

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Error: "));
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			debug::error(T_('Move Unsuccessful!'));
		});
	}


	/**
	 * copy file and folders to new location
	 * @return [type] [description]
	 */
	public function post_rename()
	{
		$qry   = $this->qryCreator(['id', 'location', 'status']);

		$fname = utility::post('fname');
		$qry   = $qry->set('attachment_name', $fname);
		$qry   = $qry->update();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function()
		{
			debug::true(T_("Rename Successfully"));
			debug::property('status', 'ok');
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Error: "));
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			// remove file if has problem
		});
	}

	public function post_favorites()
	{
		$qry         = $this->qryCreator(['id', 'status']);
		$myFavStatus = '#'.utility::post('status');

		$qry         = $qry->set('attachment_fav', $myFavStatus);
		$qry         = $qry->update();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function()
		{
			// debug::true(T_("Set Favorites Successfully"));
			debug::property('status', 'ok');
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Error: "));
			debug::property('status', 'fail');
			debug::property('error', T_('Error'));
			// remove file if has problem
		});

		return true;
	}

	public function post_tagadd()
	{
		$myTags  = utility::post('tags');
		$myTags  = explode(',', $myTags);
		foreach ($myTags as $key => $value)
		{
			$value = trim($value," ");
			$value = trim($value,"'");

			if($value)
				$myTags[$key] = $value;
			else
				unset($myTags[$key]);
		}

		$tags_id = array();
		if(count($myTags)>0)
		{
			$qry_tag = $this->sql()->table('terms');
			// add each tag to sql syntax
			foreach ($myTags as $value)
			{
				if($value)
				{
					$qry_tag = $qry_tag
						->set('term_type',  'tag')
						->set('term_title',  $value)
						->set('term_slug',   $value)
						->set('term_url',    $value);
				}
			}
			// var_dump($qry_tag->insertString('IGNORE'));exit();
			$qry_tag->insert('IGNORE');


			// get the list of tags id
			$tags_id = $this->cp_tag_id($myTags, false);
		}

		// ---------------------------------------------- set termusage table
		// if terms exist go to foreach
		if(isset($tags_id) && is_array($tags_id) && count($tags_id)>0)
		{
			$myId = $this->getItems(true);
			if(!is_numeric($myId))
				return false;

			$qry_tagusages = $this->sql()->table('termusages');
			foreach ($tags_id as $value)
				$qry_tagusages = $qry_tagusages
					->set('term_id',           $value)
					->set('termusage_id',      $myId)
					->set('termusage_foreign', 'attachments');
			// var_dump($qry_tagusages->insertString());exit();
			$qry_tagusages->insert('IGNORE');
		}


		$this->commit(function()
		{
			debug::true(T_("Insert Successfully"));
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Transaction error").': ');
		} );
		return true;
	}


	public function post_tagremove()
	{
		$myId = $this->getItems(true);
		if(!is_numeric($myId))
			return false;

		$qry_term_del = $this->sql()->table('termusages')
			->where('termusage_id', $myId )
			->and('termusage_foreign', 'attachments');

		$myTags  = utility::post('tags');
		$myTags  = $this->cp_tag_id($myTags);

		if(count(explode(',', $myTags)) === 1)
			$qry_term_del = $qry_term_del->and('term_id', '=', $myTags);
		else
			$qry_term_del = $qry_term_del->and('term_id', 'in', "(". $myTags .")" );

		// var_dump($qry_term_del->deleteString());
		$qry_term_del = $qry_term_del->delete();

		$this->commit(function()
		{
			debug::true(T_("Delete Successfully"));
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Transaction error").': ');
		} );
		return true;
	}


	/**
	 * Save result of custom app as property of file
	 * @return [type] [description]
	 */
	function post_result($_type = 'return')
	{
		$appAuthCode = \lib\utility::post('authcode');

		if($appAuthCode)
		{
			$appType = 'post';
		}
		elseif(\lib\utility::get('authcode'))
		{
			$appAuthCode = \lib\utility::get('authcode');
			$appType = 'get';
		}
		else
		{
			return false;
		}

		// check if authcode is correct! then continue else return false
		$myID          = utility\ShortURL::decode($appAuthCode);
		$authCodeExist = $this->qryCreator(['id', 'status'], $myID);
		if($authCodeExist->select()->num() <1)
		{
			return false;
		}

		$appResult = \lib\utility::{$appType}('result');

		if($appAuthCode && $appResult)
		{
			$appResult =
			[
				T_('AuthCode')	=> $appAuthCode,
				T_('Result')	=> $appResult,
			];

			for ($i=1; $i <= 5; $i++)
			{
				$appKey   = \lib\utility::{$appType}('key'.$i);
				$appValue = \lib\utility::{$appType}('value'.$i);
				if($appKey && $appValue)
				{
					$appResult[$appKey] = $appValue;
					// run save func for saving result of app in property of file
					if($_type !== 'return')
					{
						$appResult['id']    = $myID;
						$appResult['type']  = 'auto';
						$appResult['key']   = $appKey;
						$appResult['value'] = $appValue;
						$this->post_propadd($appResult);
					}
				}
			}
			if($_type === 'return')
			{
				return $appResult;
			}
		}
		else
			return false;
	}


	public function post_propadd($_data)
	{
		// add current user to query string
		$uid       = $this->login('id');
		if(!$uid)
			return false;

		if(is_array($_data) && isset($_data['type']) && $_data['type'] === 'auto')
		{
			$myId    = $_data['id'];
			$myType  = $_data['type'];
			$myKey   = $_data['key'];
			$myValue = $_data['value'];
		}
		else
		{
			$myId = $this->getItems(true);
			if(!is_numeric($myId))
				return false;

			$myKey  = utility::post('name');
			$myValue = utility::post('value');
			$myType  = utility::post('type');
			if(!$myType)
				$myType = 'manual';

		}
		// return if name or value is null
		if(strlen($myKey) == 0 || strlen($myValue) == 0)
			return;

		$qry_prop_exist = $this->sql()->table('attachmentmetas')
			->where('attachment_id',     $myId)
			->and('attachmentmeta_cat',  'property_'.$myType)
			->and('attachmentmeta_meta', $uid)
			->and('attachmentmeta_key',  $myKey)
			;



		$prop_exist_count = $qry_prop_exist->select()->num();
		// property exist only one time
		if($prop_exist_count == 1)
		{
			// if exist in table only update value of this item
			$qry_prop_exist = $qry_prop_exist->set('attachmentmeta_value', $myValue);
			// var_dump($qry_prop->updateString());exit();
			$qry_prop_exist->update();

		}
		// property exist more than one times!
		elseif ($prop_exist_count > 1)
		{
			debug::error(T_("This propery is exist many times!"));
			return false;
		}
		// property does not exist in db
		else
		{
			$qry_prop = $this->sql()->table('attachmentmetas')
				->set('attachment_id',        $myId)
				->set('attachmentmeta_cat',   'property_'.$myType)
				->set('attachmentmeta_meta',  $uid)
				->set('attachmentmeta_key',   $myKey)
				->set('attachmentmeta_value', $myValue);
			// var_dump($qry_prop->insertString());exit();
			$qry_prop->insert();
		}


		$this->commit(function()
		{
			debug::true(T_("Save New Property Successfully"));
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Transaction error").': ');
		} );
		return true;

	}


	public function post_propremove()
	{
		$myId = $this->getItems(true);
		if(!is_numeric($myId))
			return false;

		$myRowID  = utility::post('id');
		if(!$myRowID)
			return;

		$qry_prop = $this->sql()->table('attachmentmetas')
			->where('id',                $myRowID)
			->and('attachment_id',       $myId)
			->and('attachmentmeta_meta', $this->login('id'));

		$qry_prop = $qry_prop->delete();

		$this->commit(function()
		{
			debug::true(T_("Remove Successfully"));
		});

		// if a query has error or any error occour in any part of codes, run roolback
		$this->rollback(function()
		{
			debug::title(T_("Transaction error").': ');
		} );
		return true;
	}


	public function post_prop()
	{
		$qry   = $this->qryCreator(['id', 'status', 'order']);

		$qry   = $qry->field('id',
							'#attachment_title as title',
							'#attachment_desc as description',
							'#attachment_type as type',
							// '#attachment_addr as address',
							'#attachment_name as name',
							'#attachment_ext as ext',
							'#attachment_size as size',
							'#attachment_parent as parent',
							// '#attachment_order as order',
							'#attachment_status as status',
							'#attachment_date as date',
							'#attachment_meta as meta'
						);
		$datatable = $qry->select('id');

		if($datatable->num()<1)
			return false;

		$datatable = $datatable->assoc();

		// var_dump($datatable);

		$datatable['meta']   = json_decode($datatable['meta'], true);

		if(isset($datatable['meta']['width']))
			$datatable['width'] = $datatable['meta']['width'];

		if(isset($datatable['meta']['height']))
			$datatable['height'] = $datatable['meta']['height'];

		if(isset($datatable['meta']['thumb']))
			$datatable['thumb'] = $datatable['meta']['thumb'];

		$datatable['size']   = \lib\utility\Upload::readableSize($datatable['size'], $datatable['type']);


		$datatable['id']     = utility\ShortURL::encode($datatable['id']);
		$datatable['status'] = $datatable['status'] == 'normal'? '': $datatable['status'];

		if($datatable['type'] == 'folder')
		{
			$datatable['icon'] = 'folder';
			unset($datatable['ext']);
		}
		elseif($datatable['type'] == 'file' && isset($datatable['meta']) && isset($datatable['meta']['type']))
		{
			$datatable['icon'] = 'file-'.$datatable['meta']['type'].'-o';
		}
		elseif($datatable['type'] == 'system')
		{
			$datatable['icon'] = 'hdd-o';
		}
		elseif($datatable['type'] == 'other')
		{
			$datatable['icon'] = 'file';
		}
		else
			$datatable['icon'] = 'file-o';

		switch ($datatable['meta']['mime'])
		{
			case 'audio/ogg':
			case 'audio/mpeg':
			case 'audio/wav':
				$datatable['audio']      = $datatable['meta']['file'];
				$datatable['audio-type'] = $datatable['meta']['mime'];
				break;

			case 'video/mp4':
			case 'video/webm':
			case 'video/ogg':
				$datatable['video']      = $datatable['meta']['file'];
				$datatable['video-type'] = $datatable['meta']['mime'];
				break;

			default:
				break;
		}
				// $datatable['video']      = $datatable['meta']['mime'];

		unset($datatable['type']);
		unset($datatable['status']);
		unset($datatable['parent']);
		unset($datatable['meta']);
		unset($datatable['icon']);

		// \lib\utility\Upload::readableSize()
		foreach ($datatable as $key => $value)
		{
			if($value === null)
				unset($datatable[$key]);

			// dont translate id
			switch ($key)
			{

				case 'id':
				case 'icon':
				case 'thumb':
				case 'filetype':
				case 'audio':
				case 'audio-type':
				case 'video-type':
				case 'video-type':
					break;

				case 'size':
				case 'title':
				case 'description':
				case 'name':
				case 'ext':
				case 'date':
				default:
					unset($datatable[$key]);
					$datatable[T_(ucfirst($key))] = $value;
					break;
			}
		}

		// debug::property('datatable', $datatable);
		// return;


		// ============= add tags to properties
		$myId = $this->getItems(true);
		// if(!is_numeric($myId))
			// return false;

		$qry = $this->sql()->table('terms')
			->where('term_type', 'tag')
			->field('term_title');

		$qry->joinTermusages()->on('term_id', '#terms.id')
			->and('termusage_foreign', '#"attachments"')
			->and('termusage_id', $myId);


		$qry = $qry->select()->allassoc('term_title');
		$qry = $qry? implode($qry, ', ').', ' : null;

		$datatable['tags'] = $qry;


		// ============= add custom prop to properties
		$qry_prop = $this->sql()->table('attachmentmetas')
			->where('attachment_id', $myId )
			->and('attachmentmeta_meta', $this->login('id'))
			->field(
				'id',
				'#attachmentmeta_key as mykey',
				'#attachmentmeta_value as myvalue'
				)
			->select();

		$qry_prop       = $qry_prop->allassoc();
		$datatable_prop = array();
		foreach ($qry_prop as $key => $row)
		{

			$datatable_prop[$row['id']] = [$row['mykey'] => $row['myvalue']];
		}
		$datatable['prop'] = $datatable_prop;


		debug::property('datatable', $datatable);
	}

	// ----------------------------------------------------------------------- Other Useful Queries

	/**
	 * send list of tag title and get list of it's id
	 * @param  [type]  $_list   list received by func
	 * @param  boolean $_string type of output
	 * @return [type]           send depending on type of output
	 */
	function cp_tag_id($_list, $_string = true )
	{
		// get the list of tags
		$qry_tags  = $this->sql()->table('terms')->where('term_type', 'tag');
		// $_list     = array_filter($_list);

		if(is_array($_list))
		{
			if(count($_list) === 1)
			{
				// use =
				$qry_tags = $qry_tags->and('term_title', '=', "'".array_pop($_list)."'");
			}
			else
			{
				// use IN
				$_list = implode("','", $_list);
				$_list = "'" . $_list."'";

				$qry_tags = $qry_tags->and('term_title', 'IN', "(". $_list . ")");
			}
		}
		else
		{
			$qry_tags = $qry_tags->and('term_title', '=', "'".$_list."'");
		}

		// set field name and assoc all rows
		// var_dump($qry_tags->field('id')->selectString());
		// var_dump($qry_tags->select()->num());
		// var_dump($qry_tags);
		$qry_tags = $qry_tags->field('id')->select()->allassoc('id');

		if($qry_tags)
		{
			if($_string)
			{
				if(count($qry_tags) === 1 && isset($qry_tags[0]))
					return $qry_tags[0];
				else
					return implode(",", $qry_tags);
			}

			return $qry_tags;
		}
		return null;
	}

}
?>