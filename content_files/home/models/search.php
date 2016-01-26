<?php
namespace content_files\home\models;
use \lib\debug;
use \lib\utility;

trait search
{
	/**
	 * Query String of search that search in 2 table attachments and attachmentmetas
	 * and find related data in these tables
	 * @return [type] [description]
	 */
	function draw_search()
	{
		// Check permission and if user can do this operation
		// allow to do it, else show related message in notify center
		$this->access('files', 'search', 'view', 'block');

		$q = utility::get('q');
		// search query string
		$qString = "SELECT
				`attachments`.`id`,
				`attachments`.`file_id`,
				attachment_title 	as title,
				attachment_desc 	as description,
				attachment_type 	as type,
				attachment_name 	as name,
				attachment_ext 		as ext,
				attachment_size 	as size,
				attachment_meta 	as meta,
				attachment_parent 	as parent,
				attachment_fav 		as fav,
				attachment_status 	as status,
				attachment_date 	as date
				FROM `attachments`

				INNER JOIN attachmentmetas ON `attachmentmetas`.`attachment_id` = `attachments`.`id`

				WHERE `attachments`.`user_id` = 1
				AND attachment_status IN ('normal', 'trash')
				AND
				(
						attachment_name LIKE '%$q%'
					OR 	attachment_meta LIKE '%$q%'
					OR 	attachmentmeta_key LIKE '%$q%'
					OR 	attachmentmeta_value LIKE '%$q%'
				)
			";
		$sQry = $this->sql()->query($qString);
		$sQry = $sQry->allassoc();

		return $this->draw_fix($sQry);

		// $qry  = $this->qryCreator(['status', 'search', 'field']);
		// var_dump($qry->selectString());exit();
		// $qry = $qry->select()->allassoc();
		// return $this->draw_fix($qry);
	}

}
?>