<?php
namespace content_files\home;
use \lib\debug;
use \lib\utility;
class model extends \mvc\model
{
	public function post_upload()
	{
		$FOLDER_SIZE = 1000;
		$SERVER_SIZE = 1000000;		// 1 milion file can save in each server
		$server_id   = 1;
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
		$url_normal = null;

		switch ($file_ext)
		{
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
			default:
				$extlen     = strlen(utility\Upload::$fileExt);
				$url_file   = substr($url_full, 0, -$extlen-1);
				$url_thumb  = $url_file.'-thumb.'.utility\Upload::$fileExt;
				$url_normal = $url_file.'-normal.'.utility\Upload::$fileExt;
				// var_dump($thumb_url);
				// exit();
				utility\Image::load($url_full);
				// utility\Image::thumb(600, 400);
				// utility\Image::save($url_normal);

				utility\Image::thumb(150, 150);
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
						'normal' => $url_normal,
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
		$location    = '/'.utility::post('location');

		if( strpos($_SERVER['HTTP_REFERER'], $location) === false ) 
		{
			debug::property('status', 'fail');
			debug::property('error', T_('Fail on get current location'));

			$this->_processor(['force_json'=>true, 'not_redirect'=>true]);
			return false;
		}


		$qry = $this->sql();
		$qry = $qry->table('attachments')
					->set('file_id',           $new_file_id)
					->set('attachment_type',   'file')
					->set('attachment_addr',   $location)
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

	public function post_createfolder()
	{
		var_dump('upload');
		# code...
	}
}
?>