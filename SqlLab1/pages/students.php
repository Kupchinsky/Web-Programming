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
	`students`.`id`,
	`students`.`name`,
	`students`.`group_id`,
	`groups`.`name` AS `group_name`
FROM `students`, `groups`
WHERE
	`students`.`group_id` = `groups`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}