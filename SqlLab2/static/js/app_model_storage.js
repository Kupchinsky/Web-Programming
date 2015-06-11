function CreateModel_storage_drugs(content_object, callback)
{
	CreateSubCaption(content_object, 'Склад лекарств');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=storage_drugs', function(data)
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
					var accordion_item_object = AddAccordionItem(accordion, value['drug_id'], value['drug_name']);

					CreateSubContent(accordion_item_object).html('Количество: ' + value['quantity'] + (value['quantity_reserved'] != null ? ' (из них ' + value['quantity_reserved'] + ' в резерве)' : ''));
					CreateSubContent(accordion_item_object).html('Критическое количество: ' + value['quantity_critical']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_drug_id', value['drug_id'])
							.attr('edit_quantity', value['quantity'])
							.attr('edit_quantity_critical', value['quantity_critical'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Выбросить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=storage_drugs',
						{
							action: 'delete',
							drug: value['drug_id']
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
					active: false,
					heightStyle: "content"
				});
			}
		});
	};

	Loaders['storage_drugs'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение лекарства',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=storage_drugs',
				{
					action: 'edit',
					drug: edit_dialog.attr('edit_drug_id'),
					quantity: edit_input_quantity.val(),
					quantity_critical: edit_input_quantity_critical.val()
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
			edit_input_quantity.val(edit_dialog.attr('edit_quantity'));
			edit_input_quantity_critical.val(edit_dialog.attr('edit_quantity_critical'));
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_quantity = CreateInputWithLabel(edit_dialog_table, 'Количество:', ''), edit_input_quantity_critical = CreateInputWithLabel(edit_dialog_table, 'Критическое количество:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление лекарства на склад',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=storage_drugs',
				{
					action: 'add',
					drug: select_drug.children().first().val(),
					quantity: input_quantity.val(),
					quantity_critical: input_quantity_critical.val()
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
		],
		open: function()
		{
			_JSONLoad(select_drug, './?page=drugs', function(data)
			{
				select_drug.empty();
				var selectmenu = CreateSelectMenu(select_drug, 'dialog');

				DisableDialogButton(dialog, 0, data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var dialog_table = CreateTable(dialog), input_quantity = CreateInputWithLabel(dialog_table, 'Количество:', ''), input_quantity_critical = CreateInputWithLabel(dialog_table, 'Критическое количество:', ''), select_drug = CreateInput(dialog_table, 'Лекарство:');

	CreateButton(content_object, '', 'Пополнить склад').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}

function CreateModel_storage_medicaments(content_object, callback)
{
	CreateSubCaption(content_object, 'Склад медикаментов');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=storage_medicaments', function(data)
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
					var accordion_item_object = AddAccordionItem(accordion, value['medicament_id'], value['medicament_name']);

					CreateSubContent(accordion_item_object).html('Количество: ' + value['quantity'] + (value['quantity_reserved'] != null ? ' (из них ' + value['quantity_reserved'] + ' в резерве)' : ''));
					CreateSubContent(accordion_item_object).html('Критическое количество: ' + value['quantity_critical']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_medicament_id', value['medicament_id'])
							.attr('edit_quantity', value['quantity'])
							.attr('edit_quantity_critical', value['quantity_critical'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Выбросить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=storage_medicaments',
						{
							action: 'delete',
							medicament: value['medicament_id']
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
					active: false,
					heightStyle: "content"
				});
			}
		});
	};

	Loaders['storage_medicaments'] = load;

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
				$.post('./?page=storage_medicaments',
				{
					action: 'edit',
					medicament: edit_dialog.attr('edit_medicament_id'),
					quantity: edit_input_quantity.val(),
					quantity_critical: edit_input_quantity_critical.val()
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
			edit_input_quantity.val(edit_dialog.attr('edit_quantity'));
			edit_input_quantity_critical.val(edit_dialog.attr('edit_quantity_critical'));
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_quantity = CreateInputWithLabel(edit_dialog_table, 'Количество:', ''), edit_input_quantity_critical = CreateInputWithLabel(edit_dialog_table, 'Критическое количество:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление медикамента на склад',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=storage_medicaments',
				{
					action: 'add',
					medicament: select_medicament.children().first().val(),
					quantity: input_quantity.val(),
					quantity_critical: input_quantity_critical.val()
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
		],
		open: function()
		{
			_JSONLoad(select_medicament, './?page=medicaments', function(data)
			{
				select_medicament.empty();
				var selectmenu = CreateSelectMenu(select_medicament, 'dialog');

				DisableDialogButton(dialog, 0, data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var dialog_table = CreateTable(dialog), input_quantity = CreateInputWithLabel(dialog_table, 'Количество:', ''), input_quantity_critical = CreateInputWithLabel(dialog_table, 'Критическое количество:', ''), select_medicament = CreateInput(dialog_table, 'Медикамент:');

	CreateButton(content_object, '', 'Пополнить склад').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}