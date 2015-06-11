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
					Config::getDB()->query('DELETE FROM `storage_drugs` WHERE `drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `storage_drugs` SET `drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '", `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '", `quantity_critical`="' . Config::getDB()->safesql($_POST['quantity_critical']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `storage_drugs` SET `quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '", `quantity_critical`="' . Config::getDB()->safesql($_POST['quantity_critical']) . '" WHERE `drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`storage_drugs`.`drug_id`,
	`drugs`.`name` AS `drug_name`,
	`storage_drugs`.`quantity`,
	`storage_drugs`.`quantity_critical`,
	(
		SELECT
			SUM(`quantity`)
		FROM
			`storage_reserved_drugs`
		WHERE
			`storage_reserved_drugs`.`drug_id` = `storage_drugs`.`drug_id`
	) AS `quantity_reserved`
FROM
	`storage_drugs`
JOIN
	`drugs`
ON
	`drugs`.`id` = `storage_drugs`.`drug_id`
ORDER BY `storage_drugs`.`drug_id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}