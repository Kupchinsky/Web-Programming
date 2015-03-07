<?
	class Page
	{
		public function __construct($template)
		{
			$template->setContent(
			'
	<h2>Услуги компании</h2>
	<hr>
	<img src="static/services_osel.png" alt="">
	<hr>
	<ul>
		<li>
			<p>Оптовая закупка товара "лапша быстрого приготовления"</p>
		</li>
		<li>
			<p>Доставка в кратчайшие сроки</p>
		</li>
		<li>
			<p>Заварка прямо на месте</p>
		</li>
	</ul>
	<hr>
	<a id="newpay" class="btn btn-lg btn-success" href="#newpayform">Оформить заказ!</a>
	<div id="newpayform" style="padding-top: 20px; display: none">
		<form action="' . $_SERVER['PHP_SELF'] . '?page=services&newpay" method="POST">
			<input type="text" placeholder="Фамилия, имя, отчество" name="personname" value=""><br>
			<input type="text" placeholder="Адрес доставки" name="targetaddress" value=""><br>
			<input type="text" placeholder="Номер телефона (+7 ...)" name="phone" value=""><br>
			<input type="text" placeholder="E-Mail" name="email" value=""><br><br>

			<div class="btn-group">
				<button type="submit" class="btn btn-primary">Ок</button>
				<button type="reset" class="btn">Сбросить</button>
			</div>
		</form>
	</div>
			');
		}
	}