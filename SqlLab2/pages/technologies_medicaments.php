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
					Config::getDB()->query('DELETE FROM `technologies_medicaments` WHERE `technology_id`="' . Config::getDB()->safesql($_POST['technology']) . '" AND `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `technologies_medicaments` SET `technology_id`="' . Config::getDB()->safesql($_POST['technology']) . '", `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '", `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `technologies_medicaments` SET `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '" WHERE `technology_id`="' . Config::getDB()->safesql($_POST['technology']) . '" AND `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`technologies_medicaments`.`medicament_id`,
	`technologies_medicaments`.`quantity`,
	`medicaments`.`name` AS `medicament_name`
FROM
	`technologies_medicaments`
JOIN
	`medicaments`
ON
	`medicaments`.`id` = `technologies_medicaments`.`medicament_id`
WHERE
	`technologies_medicaments`.`technology_id`="' . Config::getDB()->safesql($_GET['technology']) . '"', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}