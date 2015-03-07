<?
	class Page
	{
		public function __construct($template)
		{
			$template->setContent(
			'
	<h2>Связь с нами</h2>
	<hr>
	<table>
		<tbody>
			<tr>
				<td>Техподдержка</td>
				<td><a href="mailto:support@bichpaket.ru">support@bichpaket.ru</a> (круглосуточно без выходных)</td>
			</tr>
			<tr>
				<td>Заказы</td>
				<td><a href="mailto:sales@bichpaket.ru">sales@bichpaket.ru</a> (по будням 10:00-19:00 по московскому времени)</td>
			</tr>
			<tr>
				<td>Бухгалтерия</td>
				<td><a href="mailto:bill@bichpaket.ru">bill@bichpaket.ru</a> (по будням 10:00-19:00 по московскому времени)</td>
			</tr>
			<tr>
				<td>Жалобы на контент</td>
				<td><a href="mailto:abuse@bichpaket.ru">abuse@bichpaket.ru</a></td>
			</tr>
			<tr>
				<td>Руководство</td>
				<td><a href="mailto:director@bichpaket.ru">director@bichpaket.ru</a> (обращайтесь, если недовольны нашими сотрудниками)</td>
			</tr>
			<tr>
				<td colspan="2" style="border: none">&nbsp;</td>
			</tr>
			<tr>
				<td>Телефон/факс</td>
				<td>
					(по будням 10:00-19:00 по московскому времени)<br>
					Москва +7 (495) 123-45-67<br>
					Другие регионы 8 (800) 333-44-55 (бесплатно со всех мобильных и стационарных телефонов)
				</td>
			</tr>
		</tbody>
	</table>
	<hr>
	<p>
		Внимание! Остерегайтесь чрезмерного употребления!<br>
		<img src="static/services_vred.png" alt="" style="width: 400px; height: 300px; padding-top: 10px">
	</p>
			');
		}
	}