<?php
namespace mvc;

class view extends \lib\mvc\view
{
	function config()
	{
		// define default value for global

		$this->data->site['title']   = T_("Archiver");
		$this->data->site['desc']    = T_("Archiver is new");
		$this->data->site['slogan']  = T_("Archiver is our company");

		$this->data->page['desc']    = T_("Archiver is Inteligent.");

		// add language list for use in display
		$this->global->langlist		= array(
												'fa_IR' => 'فارسی',
												'en_US' => 'English',
												);

		$this->url->MainStatic       = false;

		// if you need to set a class for body element in html add in this value
		// $this->data->bodyclass      = null;

		if(method_exists($this, 'options')){
			$this->options();
		}
	}
}
?>