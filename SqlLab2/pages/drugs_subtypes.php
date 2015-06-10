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
					Config::getDB()->query('DELETE FROM `drugs_subtypes` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `drugs_subtypes` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `type_id`="' . Config::getDB()->safesql($_POST['type']) . '", `applytype_id`="' . Config::getDB()->safesql($_POST['applytype']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `drugs_subtypes` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `type_id`="' . Config::getDB()->safesql($_POST['type']) . '", `applytype_id`="' . Config::getDB()->safesql($_POST['applytype']) . '" WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`drugs_subtypes`.`id`,
	`drugs_subtypes`.`name`,
	`drugs_types`.`id` AS `type_id`,
	`drugs_types`.`name` AS `type_name`,
	`drugs_applytypes`.`id` AS `applytype_id`,
	`drugs_applytypes`.`name` AS `applytype_name`
FROM
	`drugs_subtypes`
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