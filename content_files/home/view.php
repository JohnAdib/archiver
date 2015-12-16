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

		if(count($this->data->location)>1 && $this->data->location[0] == '$')
		{
			switch ($this->data->location[1])
			{
				case 'favorites':
					$this->data->datatable = $this->model()->draw_favorites();
					// var_dump($this->data->datatable);
					break;

				case 'tags':
					$this->data->datatable = $this->model()->draw_tags();
					break;

				default:
					$this->data->datatable = array();
					break;
			}
			
		}
		else
		{
			$this->data->datatable = $this->model()->draw();
		}

		if(count($this->data->location) == 0 && count($this->data->datatable) == 0)
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