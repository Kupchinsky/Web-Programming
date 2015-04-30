<?
	class Page
	{
		public function printTemplate()
		{
			return false;
		}

		public function getContent()
		{
			return json_encode(Config::getDB()->super_query('
SELECT
	`id`, `name`
FROM `groups`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}