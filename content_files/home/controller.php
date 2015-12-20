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
				$this->route_check_true = true;
				// $tmp_url   = $this->url('path');
				// var_dump($tmp_url);

				switch ($myurl[1])
				{
					case 'upload':
					case 'paste':
					case 'remove':
					case 'createfolder':
					case 'createfile':
					case 'rename':
					case 'prop':
					case 'tagadd':
					case 'tagremove':
					case 'propadd':
					case 'propremove':
						// var_dump($myurl[1]);
						// $this->get()->ALL();
						$this->post($myurl[1])->ALL();
						break;
					case 'profile':
					case 'favorites':
					case 'tags':
						$this->route_check_true = true;
						$this->get()->ALL();
						$this->post($myurl[1])->ALL();
						break;

					case 'result':
						$this->route_check_true = true;
						$this->get()->ALL();
						$this->post()->ALL();
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