<?
	class Page
	{
		public function __construct($template)
		{
			$template->setContent(
			'
	<h2>Наш продукт самый лучший в мире!</h2>
	<hr>
	<p>
		Компания занимается закупкой и доставкой в конечный пункт товара "лапша быстрого приготовления".
		<br><br>
		<img src="static/index_lapsha.jpg" alt="" style="width: 200px; height: 200px">
		<img src="static/index_lapsha2.jpg" alt="" style="width: 200px; height: 200px">
		<img src="static/index_lapsha3.jpg" alt="" style="width: 200px; height: 200px">
		<br><br>
		<a class="btn btn-lg btn-success" href="' . $_SERVER['PHP_SELF'] . '?page=services">Хочу!</a>
	</p>
			');
		}
	}