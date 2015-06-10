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
					Config::getDB()->query('DELETE FROM `drugs` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `drugs` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `price`="' . Config::getDB()->safesql($_POST['price']) . '", `subtype_id`="' . Config::getDB()->safesql($_POST['subtype']) . '"');
					return json_encode(array('success' => true, 'query' => Config::getDB()->get_last_query()));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `drugs` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `price`="' . Config::getDB()->safesql($_POST['price']) . '", `subtype_id`="' . Config::getDB()->safesql($_POST['subtype']) . '" WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`drugs`.`id`,
	`drugs`.`name`,
	`drugs`.`price`,
	`drugs_subtypes`.`id` AS `subtype_id`,
	`drugs_subtypes`.`name` AS `subtype_name`,
	`drugs_types`.`name` AS `type_name`,
	`drugs_applytypes`.`name` AS `applytype_name`
FROM
	`drugs`
JOIN
	`drugs_subtypes`
ON
	`drugs_subtypes`.`id` = `drugs`.`subtype_id`
JOIN
	`drugs_types`
ON
	`drugs_types`.`id` = `drugs_subtypes`.`type_id`
JOIN
	`drugs_applytypes`
ON
	`drugs_applytypes`.`id` = `drugs_subtypes`.`applytype_id`
ORDER BY `drugs_subtypes`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}