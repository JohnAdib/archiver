<?php
namespace database\saloos;
class terms 
{
	public $id            = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'id'              ,'type'=>'int@10'];
	public $term_language = ['null'=>'YES' ,'show'=>'YES'     ,'label'=>'language'        ,'type'=>'char@2'];
	public $term_type     = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'type'            ,'type'=>'varchar@50!tag'];
	public $term_title    = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'title'           ,'type'=>'varchar@50'];
	public $term_slug     = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'slug'            ,'type'=>'varchar@50'];
	public $term_desc     = ['null'=>'YES' ,'show'=>'YES'     ,'label'=>'desc'            ,'type'=>'text@'];
	public $term_url      = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'url'             ,'type'=>'varchar@200'];
	public $term_parent   = ['null'=>'YES' ,'show'=>'YES'     ,'label'=>'parent'          ,'type'=>'int@10'                          ,'foreign'=>'terms@id!term_title'];
	public $term_count    = ['null'=>'YES' ,'show'=>'YES'     ,'label'=>'count'           ,'type'=>'smallint@5'];
	public $term_status   = ['null'=>'NO'  ,'show'=>'YES'     ,'label'=>'status'          ,'type'=>'enum@enable,disable,expire!enable'];
	public $date_modified = ['null'=>'YES' ,'show'=>'YES'     ,'label'=>'modified'        ,'type'=>'timestamp@'];

	//--------------------------------------------------------------------------------id
	public function id(){}

	public function term_language()
	{
		$this->form()->type('text')->name('language')->maxlength('2');
	}

	public function term_type()
	{
		$this->form()->type('text')->name('type')->maxlength('50')->required();
	}

	public function term_title()
	{
		$this->form('#title')->type('text')->name('title')->maxlength('50')->required();
	}

	public function term_slug()
	{
		$this->form('#slug')->type('text')->name('slug')->maxlength('50')->required();
	}

	public function term_desc()
	{
		$this->form('#desc')->type('textarea')->name('desc');
	}

	public function term_url()
	{
		$this->form()->type('textarea')->name('url')->maxlength('200')->required();
	}

	public function term_parent()
	{
		$this->form()->type('select')->name('parent');
		$this->setChild();
	}

	public function term_count()
	{
		$this->form()->type('number')->name('count')->min()->max('99999');
	}

	public function term_status()
	{
		$this->form()->type('radio')->name('status')->required();
		$this->setChild();
	}

	public function date_modified(){}
}
?>