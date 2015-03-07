<?
	class BaseTemplate
	{
		var $content;
		var $navbar;
		var $title;
		var $brand;

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

		public function setBrand($brand)
		{
			$this->brand = $brand;
			return $this;
		}

		public function setNavbar($navbar)
		{
			$this->navbar = $navbar;
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

	<link href="static/bootstrap.min.css" rel="stylesheet">
	<link href="static/ui/jquery-ui.min.css" rel="stylesheet">
	<link href="static/navbar.css" rel="stylesheet">
	<link href="static/main.css?1" rel="stylesheet">

	<script type="text/javascript" src="static/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="static/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="static/main.js?4"></script>
</head>
<body>
	<div class="container">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="<?= $_SERVER['PHP_SELF']; ?>"><?= $this->brand; ?></a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<?= $this->navbar->get(); ?>
					</ul>
				</div>
			</div>
		</nav>

		<div class="jumbotron">
			<?= $this->content; ?>
		</div>
	</div>
</body>
</html>
<?
		}
	}