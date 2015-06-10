function CreateModel_medicaments(content_object, callback)
{
	CreateSubCaption(content_object, 'Медикаменты');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=medicaments', function(data)
		{
			if (data.length == 0)
			{
				CreateAlert(subcontent_object, 'Данные отсутствуют');
			}
			else
			{
				subcontent_object.empty();

				var accordion = CreateAccordion(subcontent_object, '');

				$(data).each(function(key, value)
				{
					var accordion_item_object = AddAccordionItem(accordion, value['id'], value['name']);

					CreateSubContent(accordion_item_object).html('Цена: ' + value['price']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('edit_name', value['name'])
							.attr('edit_price', value['price'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=medicaments',
						{
							action: 'delete',
							id: value['id']
						},
						function(data)
						{
							if (data.success)
							{
								load();
							}
							else
								alert('Что-то пошло не так!');
						}, 'json');
					});
				});

				accordion.accordion(
				{
					collapsible: true,
					active: false
				});
			}
		});
	};

	Loaders['medicaments'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение медикамента',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=medicaments',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					name: edit_input_name.val(),
					price: edit_input_price.val()
				},
				function(data)
				{
					if (data.success)
						load();
					else
						alert('Что-то пошло не так!');

					edit_dialog.dialog('close');
				}, 'json');
			}
		},
		{
			text: 'Отмена',
			click: function()
			{
				$(this).dialog('close');
			}
		}
		],
		open: function()
		{
			edit_input_name.val(edit_dialog.attr('edit_name'));
			edit_input_price.val(edit_dialog.attr('edit_price'));
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_name = CreateInputWithLabel(edit_dialog_table, 'Название:', ''), edit_input_price = CreateInputWithLabel(edit_dialog_table, 'Цена:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление медикамента',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=medicaments',
				{
					action: 'add',
					name: input_name.val(),
					price: input_price.val()
				},
				function(data)
				{
					if (data.success)
						load();
					else
						alert('Что-то пошло не так!');

					dialog.dialog('close');
				}, 'json');
			}
		},
		{
			text: 'Отмена',
			click: function()
			{
				$(this).dialog('close');
			}
		}
		]
	});
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', ''), input_price = CreateInputWithLabel(dialog_table, 'Цена:', '');

	CreateButton(content_object, '', 'Добавить медикамент').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}