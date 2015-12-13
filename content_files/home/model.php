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
	 * @param  boolean $_order  pass the field and type of order
	 * @param  boolean $_status pass status that want it 
	 * @return [type]           return the sql object for nex step
	 */
	private function qryCreator($_need, $_order = false, $_status = false)
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

		return $myQry;
	}


	public function draw()
	{
		$qry = $this->qryCreator(['location', 'status', 'order']);

		$qry = $qry->field( 'id',
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
		$qry = $qry->select('id');

		$datatable = $qry->allassoc();

		foreach ($datatable as $key =>$row)
		{
			$datatable[$key]['meta']   = json_decode($row['meta'], true);
			$datatable[$key]['cid']    = utility\ShortURL::encode($row['id']);
			$datatable[$key]['fav']    = $datatable[$key]['fav']? 'fa-star': 'fa-star-o';
			$datatable[$key]['status'] = $datatable[$key]['status'] == 'normal'? '': $datatable[$key]['status'];

			if($row['type'] == 'folder')
				$datatable[$key]['icon'] = 'folder';
			elseif($row['type'] == 'file' && isset($datatable[$key]['meta']))
				if(isset($datatable[$key]['meta']['type']) && $datatable[$key]['meta']['type']!=='file')
					$datatable[$key]['icon'] = 'file-'.$datatable[$key]['meta']['type'].'-o';
				else
					$datatable[$key]['icon'] = 'file-o';
			elseif($row['type'] == 'system')
				$datatable[$key]['icon'] = 'hdd-o';
			elseif($row['type'] == 'other')
				$datatable[$key]['icon'] = 'file';
			else
				$datatable[$key]['icon'] = 'file-o';
		}
		// var_dump($datatable);
		return $datatable;
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
		$url_full      = "$folder_name/$file_id-" . utility\Upload::$fileFullName;



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
		$file_ext   = utility\Upload::$fileExt;
		$url_thumb  = null;
		$url_file = null;

		$extlen     = strlen(utility\Upload::$fileExt);
		$url_file   = substr($url_full, 0, -$extlen-1);
		$url_file = $url_file.'.'.utility\Upload::$fileExt;

		switch ($file_ext)
		{
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
				$url_thumb  = $url_file.'-thumb.'.utility\Upload::$fileExt;
				utility\Image::load($url_full);
				utility\Image::thumb(200, 200);
				utility\Image::save($url_thumb);
				break;

			default:
				break;

		}

		// 5. get filemeta data
		$file_meta = [
						'mime'   => utility\Upload::$fileMime,
						'type'   => utility\Upload::$fileType,
						'ext'    => $file_ext,
						'url'    => $url_full,
						'thumb'  => $url_thumb,
						'file'   => $url_file,
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
						->set('id',               $qry_count+1)
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
		$qry = $this->qryCreator(['id', 'location']);

		if($shift)
		{
			$qry = $qry->set('attachment_status', '#CASE
				WHEN attachment_status = "normal" THEN "trash"
				WHEN attachment_status = "trash" THEN "deleted"
				END', 'aaa');
		}
		else
		{
			$qry = $qry->set('attachment_status', 'deleted');
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
			debug::fail(T_('Move Unsuccessful!'));
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
		$qry         = $this->qryCreator(['id', 'location', 'status']);
		$myFavStatus = utility::post('status');
		
		$qry         = $qry->set('attachment_fav', $myFavStatus);
		$qry         = $qry->update();

		// commit all changes or rollback and remove file
		// ======================================================
		// you can manage next event with one of these variables,
		// commit for successfull and rollback for failed
		// if query run without error means commit
		$this->commit(function()
		{
			debug::true(T_("Set Favorites Successfully"));
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
		// var_dump($myId);

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
			$qry_term_del = $qry_term_del->and('term_id', '=', $myTags)->delete();
		else
			$qry_term_del = $qry_term_del->and('term_id', 'in', "(". $myTags .")" )->delete();

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

	public function post_prop()
	{
		$qry   = $this->qryCreator(['id', 'location', 'status', 'order']);

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

		$datatable['width']  = isset($datatable['meta']['width'])? $datatable['meta']['width']: null;
		$datatable['height'] = isset($datatable['meta']['height'])? $datatable['meta']['height']: null;
		$datatable['thumb']  = isset($datatable['meta']['thumb'])? $datatable['meta']['thumb']: null;

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
			if( ($value == null || empty($value) ) && $key !== 'size')
			{
				// var_dump($key);
				unset($datatable[$key]);
			}

			// dont translate id
			if($key !='id' && $key!="icon" && $key!="thumb" && $key!="filetype" && $key!="audio" && $key!="audio-type" && $key!="video" && $key!="video-type")
			{
				$datatable[T_($key)] = $value;
				unset($datatable[$key]);
			}
		}

		// var_dump($datatable);

		debug::property('datatable', $datatable);
		// return;


		// add tags to properties
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