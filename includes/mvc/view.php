<?php
namespace mvc;

class view extends \lib\mvc\view
{
	function _construct()
	{
		// define default value for global

		$this->data->site['title']   = T_("Archiver");
		$this->data->site['desc']    = T_("Archiver is new");
		$this->data->site['slogan']  = T_("Ermile is our company");

		// $this->data->page['title']   = T_("Archiver");
		$this->data->page['desc']    = T_("Archiver is another archive system!");


		$this->url->MainStatic       = false;

		// if you need to set a class for body element in html add in this value
		// $this->data->bodyclass      = null;

		$this->data->display['files']     = "content_files/home/layout.html";
	}

	function options()
	{
		$this->data->feature['posts']       = false;
		$this->data->feature['pages']       = false;
		$this->data->feature['attachments'] = false;
		$this->data->feature['tags']        = true;
		$this->data->feature['categories']  = false;
		$this->data->feature['users']       = true;
		$this->data->feature['permissions'] = true;
	}

	function pushState()
	{
		$this->data->display['files']     = "content_files/home/layout-xhr.html";
	}
}
?>