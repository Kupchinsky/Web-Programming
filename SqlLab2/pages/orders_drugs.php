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
					Config::getDB()->query('DELETE FROM `orders_drugs` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `orders_drugs` SET
						`recipient_id`="' . Config::getDB()->safesql($_POST['recipient']) . '",
						`drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '",
						`way_apply`="' . Config::getDB()->safesql($_POST['way_apply']) . '",
						`quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '",
						`date_added`=NOW(),
						`total`=(SELECT `drugs`.`price` FROM `drugs` WHERE `drugs`.`id`="' . Config::getDB()->safesql($_POST['drug']) . '") * ' . Config::getDB()->safesql($_POST['quantity']));
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					$date_added = !empty($_POST['date_added']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_added']) . '",\'%d.%m.%Y\')' : 'NULL';
					$date_started = !empty($_POST['date_started']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_started']) . '",\'%d.%m.%Y\')' : 'NULL';
					$date_made = !empty($_POST['date_made']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_made']) . '",\'%d.%m.%Y\')' : 'NULL';
					$date_sell = !empty($_POST['date_sell']) ? 'STR_TO_DATE("' . Config::getDB()->safesql($_POST['date_sell']) . '",\'%d.%m.%Y\')' : 'NULL';

					Config::getDB()->query('UPDATE `orders_drugs` SET
						`recipient_id`="' . Config::getDB()->safesql($_POST['recipient']) . '",
						`drug_id`="' . Config::getDB()->safesql($_POST['drug']) . '",
						`way_apply`="' . Config::getDB()->safesql($_POST['way_apply']) . '",
						`quantity`="' . Config::getDB()->safesql($_POST['quantity']) . '",
						`date_added`=' . $date_added . ',
						`date_started`=' . $date_started . ',
						`date_made`=' . $date_made . ',
						`date_sell`=' . $date_sell . ',
						`total`=(SELECT `drugs`.`price` FROM `drugs` WHERE `drugs`.`id`="' . Config::getDB()->safesql($_POST['drug']) . '") * ' . Config::getDB()->safesql($_POST['quantity']) . '
						WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true, 'query' => Config::getDB()->get_last_query()));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`orders_drugs`.`id`,
	`orders_drugs`.`recipient_id`,
	`recipients`.`first_name`,
	`recipients`.`second_name`,
	`recipients`.`last_name`,
	`orders_drugs`.`drug_id`,
	`drugs`.`name` AS `drug_name`,
	`orders_drugs`.`way_apply`,
	`orders_drugs`.`quantity`,
	DATE_FORMAT(`orders_drugs`.`date_added`, \'%d.%m.%Y\') AS `date_added`,
	DATE_FORMAT(`orders_drugs`.`date_started`, \'%d.%m.%Y\') AS `date_started`,
	DATE_FORMAT(`orders_drugs`.`date_made`, \'%d.%m.%Y\') AS `date_made`,
	DATE_FORMAT(`orders_drugs`.`date_sell`, \'%d.%m.%Y\') AS `date_sell`,
	`orders_drugs`.`total`
FROM
	`orders_drugs`
JOIN
	`recipients`
ON
	`recipients`.`id` = `orders_drugs`.`recipient_id`
JOIN
	`drugs`
ON
	`drugs`.`id` = `orders_drugs`.`drug_id`
ORDER BY `orders_drugs`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}