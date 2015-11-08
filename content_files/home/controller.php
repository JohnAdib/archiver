<?php
namespace content_files\home;

class controller extends \mvc\controller
{
	function _route()
	{
		if(!$this->login())
		{
			\lib\debug::warn(T_("first of all, you must login to system!"));
			$this->redirector(null, false)->set_domain($this->url('AccountService'))->set_url('login?cp=1')->redirect();
			exit();
		}
		
		$myurl   = $this->url('path',-1);


		if(isset($myurl[0]) && $myurl[0] === '$')
		{
			if(count($myurl) === 2 && isset($myurl[1]))
			{
				// $tmp_url   = $this->url('path');
				// var_dump($tmp_url);

				switch ($myurl[1])
				{
					case 'upload':
					case 'move':
					case 'copy':
					case 'paste':
					case 'delete':
					case 'createfolder':
					case 'rename':
						// var_dump($myurl[1]);
						$this->post($myurl[1])->ALL();
						// $this->get()->ALL();
						break;

					default:
						\lib\error::bad();
						break;
				}
			}
			else
			{
				\lib\error::bad();
			}
		}
		else
		{
			$this->get()->ALL();
		}






		// $mymodule = $this->module();

		// show all data on this subdomain
		// $x = $this->post('upload')->ALL('upload');
		// $x = $this->get('killSession')->ALL('killSession');
		// $x = $this->get('resume')->ALL('resume');
		// $this->post('folder')->ALL("folder");


		// please don't comment below line!
		// $this->get()->ALL();
	}
}
?>