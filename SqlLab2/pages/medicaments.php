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
					Config::getDB()->query('DELETE FROM `medicaments` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `medicaments` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `price`="' . Config::getDB()->safesql($_POST['price']) . '"');
					return json_encode(array('success' => true, 'query' => Config::getDB()->get_last_query()));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `medicaments` SET `name`="' . Config::getDB()->safesql($_POST['name']) . '", `price`="' . Config::getDB()->safesql($_POST['price']) . '" WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	`medicaments`.`id`,
	`medicaments`.`name`,
	`medicaments`.`price`
FROM
	`medicaments`
ORDER BY `medicaments`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}