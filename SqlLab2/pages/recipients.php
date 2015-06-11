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
					Config::getDB()->query('DELETE FROM `recipients` WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'add')
				{
					Config::getDB()->query('INSERT INTO `recipients` SET
						`first_name`="' . Config::getDB()->safesql($_POST['first_name']) . '",
						`second_name`="' . Config::getDB()->safesql($_POST['second_name']) . '",
						`last_name`="' . Config::getDB()->safesql($_POST['last_name']) . '",
						`age`="' . Config::getDB()->safesql($_POST['age']) . '",
						`diagnosis`="' . Config::getDB()->safesql($_POST['diagnosis']) . '"');
					return json_encode(array('success' => true));
				}
				elseif ($_POST['action'] == 'edit')
				{
					Config::getDB()->query('UPDATE `recipients` SET
						`first_name`="' . Config::getDB()->safesql($_POST['first_name']) . '",
						`second_name`="' . Config::getDB()->safesql($_POST['second_name']) . '",
						`last_name`="' . Config::getDB()->safesql($_POST['last_name']) . '",
						`age`="' . Config::getDB()->safesql($_POST['age']) . '",
						`diagnosis`="' . Config::getDB()->safesql($_POST['diagnosis']) . '"
						WHERE `id`="' . Config::getDB()->safesql($_POST['id']) . '"');
					return json_encode(array('success' => true));
				}
			}

			return json_encode(Config::getDB()->super_query('
SELECT
	*
FROM
	`recipients`
ORDER BY `recipients`.`id`', true));
		}

		public function __construct($template)
		{
			require_once LIB . 'config.php';
		}
	}