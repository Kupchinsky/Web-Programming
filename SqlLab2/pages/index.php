<?
	class Page
	{
		public function printTemplate()
		{
			return true;
		}

		public function __construct($template)
		{
			ob_start();
?>
	<div id="tabs">
		<ul></ul>
	</div>
<?
			$template->setContent(ob_get_contents());
			ob_end_clean();
		}
	}