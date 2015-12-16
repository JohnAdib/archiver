<?php
namespace content_files\home;

class view extends \mvc\view
{
	public function config()
	{
		$this->include->js          = false;
		$this->include->css         = false;
		$this->include->fontawesome = true;
		$this->include->lightbox    = true;

		$this->data->bodyclass      = 'unselectable';
		
		$this->data->location       = $this->url('path', -1);
		
		// $this->global->tree      = json_encode($this->model()->tree());
		// $this->data->datatable      = $this->model()->draw($this->url->path);
		$this->data->datatable      = $this->model()->draw();
		if($this->data->location == '' && count($this->data->datatable) == 0)
		{
			$this->data->bodyclass = $this->data->bodyclass. ' first-time';
		}
		
		$this->data->site['title']  = T_("Archiver");
		$this->data->site['desc']   = T_("Archiver is new");
		$this->data->site['slogan'] = T_("Ermile is our company");
		$this->data->dir['right']   = $this->global->direction == 'rtl'? 'left':  'right';
		$this->data->dir['left']    = $this->global->direction == 'rtl'? 'right': 'left';
		
		$this->data->page['desc']   = T_("Archiver is another archive system!");

		$this->data->maxSize = \lib\utility\Upload::max_file_upload_in_bytes();

	}
}
?>