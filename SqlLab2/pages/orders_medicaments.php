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
					Config::getDB()->query('DELETE FROM `orders_medicaments` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `orders_medicaments` SET
						`medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '",
						`orders_drugs_id`="' . Config::getDB()->safesql($_POST['orders_drug']) . '",
						`quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '",
						`date_added`=NOW(),
						`total`=(SELECT `medicaments`.`price` FROM `medicaments` WHERE `medicaments`.`id`="' . Config::getDB()->safesql($_POST['medicament']) . '") * ' . Config::getDB()->safesql($_POST['quantity']));
					return json_encode(array('success' => true, 'query' => Config::getDB()->get_last_query()));
				}
				elseif ($_POST['action'] == 'edit')
				{
					$date_added = !empty($_POST['date_added']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_added']) . '",\'%d.%m.%Y\')' : 'NULL';
					$date_complete = !empty($_POST['date_complete']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_complete']) . '",\'%d.%m.%Y\')' : 'NULL';

					Config::getDB()->query('UPDATE `orders_medicaments` SET
						`medicament_id`="' . Config::getDB()->safesql($_POST['medicament']) . '",
						`orders_drugs_id`="' . Config::getDB()->safesql($_POST['orders_drug']) . '",
						`quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '",
						`date_added`=' . $date_added . ',
						`date_complete`=' . $date_complete . ',
						`total`=(SELECT `medicaments`.`price` FROM `medicaments` WHERE `medicaments`.`id`="' . Config::getDB()->safesql($_POST['medicament']) . '") * ' . Config::getDB()->safesql($_POST['quantity']) . '
						WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true, 'query' => Config::getDB()->get_last_query()));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`orders_medicaments`.`id`,
	`orders_medicaments`.`orders_drugs_id`,
	`orders_medicaments`.`medicament_id`,
	`medicaments`.`name` AS `medicament_name`,
	`drugs`.`name` AS `drug_name`,
	`orders_medicaments`.`quantity`,
	DATE_FORMAT(`orders_medicaments`.`date_added`, "%d.%m.%Y") AS `date_added`,
	DATE_FORMAT(`orders_medicaments`.`date_complete`, "%d.%m.%Y") AS `date_complete`,
	`orders_medicaments`.`total`
FROM
	`orders_medicaments`
JOIN
	`medicaments`
ON
	`medicaments`.`id` = `orders_medicaments`.`medicament_id`
JOIN
	`orders_drugs`
ON
	`orders_drugs`.`id` = `orders_medicaments`.`orders_drugs_id`
JOIN
	`drugs`
ON
	`drugs`.`id` = `orders_drugs`.`drug_id`
ORDER BY `orders_medicaments`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}