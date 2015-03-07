<?
	class Navbar
	{
		var $data = array();

		public function addItem($href, $title, $active = false)
		{
			$this->data[] = array
			(
				'href' => $href,
				'title' => $title,
				'active' => $active
			);

			return $this;
		}

		public function get()
		{
			$out_string = '';

			foreach ($this->data as $item)
				$out_string .= '<li' . ($item['active'] ? ' class="active"' : '') . '><a href="' . $item['href'] . '">' . $item['title'] . '</a></li>' . PHP_EOL;

			return $out_string;
		}
	}