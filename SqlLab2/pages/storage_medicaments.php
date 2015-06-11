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
					Config::getDB()->query('DELETE FROM `storage_medicaments` WHERE `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `storage_medicaments` SET `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '", `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '", `quantity_critical`="' . Config::getDB()->safesql($_POST['quantity_critical']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `storage_medicaments` SET `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '", `quantity_critical`="' . Config::getDB()->safesql($_POST['quantity_critical']) . '" WHERE `medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`storage_medicaments`.`medicament_id`,
	`medicaments`.`name` AS `medicament_name`,
	`storage_medicaments`.`quantity`,
	`storage_medicaments`.`quantity_critical`,
	(
		SELECT
			SUM(`quantity`)
		FROM
			`storage_reserved_medicaments`
		WHERE
			`storage_reserved_medicaments`.`medicament_id` = `storage_medicaments`.`medicament_id`
	) AS `quantity_reserved`
FROM
	`storage_medicaments`
JOIN
	`medicaments`
ON
	`medicaments`.`id` = `storage_medicaments`.`medicament_id`
ORDER BY `storage_medicaments`.`medicament_id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}