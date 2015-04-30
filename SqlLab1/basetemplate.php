<?
	class BaseTemplate
	{
		var $content;
		var $title;
		var $page_name;

		public function __construct($page_name)
		{
			$this->page_name = $page_name;
		}

		public function setContent($content)
		{
			$this->content = $content;
			return $this;
		}

		public function setTitle($title)
		{
			$this->title = $title;
			return $this;
		}

		public function printPage()
		{
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><?= $this->title; ?></title>

	<link href="static/css/jquery-ui.min.css" rel="stylesheet">
	<link href="static/css/app.css?xx" rel="stylesheet">

	<script type="text/javascript">var pageName = '<?= $this->page_name; ?>';</script>
	<script type="text/javascript" src="static/js/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="static/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="static/js/app.js?xx"></script>
</head>
<body>
	<h2><?= $this->title; ?></h2>
	<?= $this->content; ?>
</body>
</html>
<?
		}
	}