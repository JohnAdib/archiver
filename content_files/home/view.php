<?php
namespace content_files\home;

class view extends \mvc\view
{
	public function config()
	{
		$this->include->js          = false;
		$this->include->css         = false;
		$this->include->fontawesome = true;
		$this->data->bodyclass      = 'unselectable';
		
		$this->data->location       = $this->url('path', -1);
		
		// $this->global->tree      = json_encode($this->model()->tree());
		$this->data->datatable      = $this->model()->draw($this->url->path);
		
		$this->data->site['title']  = T_("Archiver");
		$this->data->site['desc']   = T_("Archiver is new");
		$this->data->site['slogan'] = T_("Ermile is our company");
		
		$this->data->page['desc']   = T_("Archiver is another archive system!");
	}
}
?>