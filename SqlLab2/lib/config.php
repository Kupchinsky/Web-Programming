<?
	if (!defined('FROM_INDEX'))
		die;

	define('DB_NAME', 'apteka');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '5`7478');
	define('DB_HOST', 'localhost');

	class Config
	{
		private static $db;
		
		static function getDB()
		{
			return self::$db;
		}

		static function processInitialize()
		{
			require_once LIB . 'mysql.php';

			self::$db = new MySQL;
			self::$db->connect(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST) or die('MySQL Error! (' . self::$db->get_error() . ')');
		}
	}

	Config::processInitialize();