<?
	define('FROM_INDEX', true);
	define('ROOT', dirname(__FILE__) . '/');
	define('LIB', ROOT . 'lib/');

	$current_page = isset($_GET['page']) ? $_GET['page'] : 'index';

	$allowed_pages = array
	(
		'index',
		'drugs_types',
		'drugs_applytypes',
		'drugs_subtypes',
		'drugs',
		'medicaments',
		'technologies',
		'technologies_medicaments',
		'storage_drugs',
		'storage_medicaments'
	);

	if (!in_array($current_page, $allowed_pages))
		die('Page not allowed');

	$current_page_file = ROOT . 'pages/' . $current_page . '.php';

	file_exists($current_page_file) || die('Page not found');

	require_once ROOT . 'basetemplate.php';
	require_once $current_page_file;
	$template = new BaseTemplate($current_page);
	$page = new Page($template);

	if ($page->printTemplate())
		$template->setTitle('Аптека "Рашнаптек груп"')->printPage();
	else
		echo $page->getContent();