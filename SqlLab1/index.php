<?
	define('FROM_INDEX', true);
	define('ROOT', dirname(__FILE__) . '/');
	define('LIB', ROOT . 'lib/');

	$current_page = isset($_GET['page']) ? $_GET['page'] : 'index';

	$allowed_pages = array('index', 'students', 'groups', 'subjects', 'exams');

	if (!in_array($current_page, $allowed_pages))
		die('Page not allowed');

	$current_page_file = ROOT . 'pages/' . $current_page . '.php';

	file_exists($current_page_file) || die('Page not found');

	require_once ROOT . 'basetemplate.php';
	require_once $current_page_file;
	$template = new BaseTemplate($current_page);
	$page = new Page($template);

	if ($page->printTemplate())
		$template->setTitle('Управление базой данных ВУЗа')->printPage();
	else
		echo $page->getContent();