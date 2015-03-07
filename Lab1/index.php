<?
	require_once dirname(__FILE__) . '/navbar.php';
	require_once dirname(__FILE__) . '/basetemplate.php';

	$current_page = isset($_GET['page']) ? $_GET['page'] : 'index';

	$allowed_pages = array('index', 'services', 'partners', 'contacts');
	$navbar_data = array('Главная', 'Услуги', 'Партнёры', 'Как с нами связаться');

	if (!in_array($current_page, $allowed_pages))
		die('Page not allowed');

	$current_page_file = dirname(__FILE__) . '/pages/' . $current_page . '.php';

	file_exists($current_page_file) || die('Page not found');

	$navbar = new Navbar();
	$template = new BaseTemplate();

	foreach ($navbar_data as $index => $page)
		$navbar->addItem($_SERVER['PHP_SELF'] . '?page=' . $allowed_pages[$index], $page, $allowed_pages[$index] == $current_page);

	require_once $current_page_file;
	new Page($template);

	$template->setNavbar($navbar)->setTitle('Компания "Бичпакет"')->setBrand('Компания "Бичпакет"')->printPage();