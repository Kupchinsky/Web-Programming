<?php
	if (!defined('FROM_INDEX'))
		die;

	if (extension_loaded('mysqli'))
		include_once LIB . 'mysqli.class.php';
	else
		include_once LIB . 'mysql.class.php';