<?
	class Page
	{
		public function printTemplate()
		{
			return false;
		}

		public function getContent()
		{
			if ($_SERVER['REQUEST_METHOD'] == 'POST')
			{
				if ($_POST['action'] == 'delete')
				{
					Config::getDB()->query('DELETE FROM `technologies` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `technologies` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `technologies` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '" WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`technologies`.`id`,
	`technologies`.`name`,
	`technologies`.`drug_id`,
	`drugs`.`name` AS `drug_name`
FROM
	`technologies`
JOIN
	`drugs`
ON
	`drugs`.`id` = `technologies`.`drug_id`
ORDER BY `technologies`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}