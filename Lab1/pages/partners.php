<?
	class Page
	{
		public function __construct($template)
		{
			$template->setContent(
			'
	<h2>Партнёры компании</h2>
	<hr>
	<p>
		<a href="http://www.rollton.ru/" target="_blank">
			<img src="static/partners_rollton.gif" alt="" style="width: 150px; height: 100px">
			<span style="padding-left: 20px">Роллтон. Лапша быстрого приготовления</span>
		</a><br>
		<a href="http://doshirak.com/" target="_blank">
			<img src="static/partners_doshirak.gif" alt="" style="width: 150px; height: 100px">
			<span style="padding-left: 20px">Доширак. Лапша быстрого приготовления</span>
		</a><br>
	</p>
			');
		}
	}