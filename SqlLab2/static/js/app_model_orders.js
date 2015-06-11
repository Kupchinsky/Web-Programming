function CreateModel_recipients(content_object, callback)
{
	CreateSubCaption(content_object, 'Рецепты');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=recipients', function(data)
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
					var accordion_item_object = AddAccordionItem(accordion, value['id'], value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name']);

					CreateSubContent(accordion_item_object).html('Возраст: ' + value['age']);
					CreateSubContent(accordion_item_object).html('Диагноз: ' + value['diagnosis']);

					if (value['address'] != null)
						CreateSubContent(accordion_item_object).html('(отложенный заказ) Адрес: ' + value['address']);
					if (value['phone'] != null)
						CreateSubContent(accordion_item_object).html('(отложенный заказ) Телефон: ' + value['phone']);

					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('edit_last_name', value['last_name'])
							.attr('edit_first_name', value['first_name'])
							.attr('edit_second_name', value['second_name'])
							.attr('edit_age', value['age'])
							.attr('edit_diagnosis', value['diagnosis'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=recipients',
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
					active: false,
					heightStyle: "content"
				});
			}
		});
	};

	Loaders['recipients'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение рецепта',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=recipients',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					last_name: edit_input_last_name.val(),
					first_name: edit_input_first_name.val(),
					second_name: edit_input_second_name.val(),
					age: edit_input_age.val(),
					diagnosis: edit_input_diagnosis.val()
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
			edit_input_last_name.val(edit_dialog.attr('edit_last_name'));
			edit_input_first_name.val(edit_dialog.attr('edit_first_name'));
			edit_input_second_name.val(edit_dialog.attr('edit_second_name'));
			edit_input_age.val(edit_dialog.attr('edit_age'));
			edit_input_diagnosis.val(edit_dialog.attr('edit_diagnosis'));
		}
	});
	var
		edit_dialog_table = CreateTable(edit_dialog),
		edit_input_last_name = CreateInputWithLabel(edit_dialog_table, 'Фамилия:', ''),
		edit_input_first_name = CreateInputWithLabel(edit_dialog_table, 'Имя:', ''),
		edit_input_second_name = CreateInputWithLabel(edit_dialog_table, 'Отчество:', ''),
		edit_input_age = CreateInputWithLabel(edit_dialog_table, 'Возраст:', ''),
		edit_input_diagnosis = CreateInputWithLabel(edit_dialog_table, 'Диагноз:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление рецепта',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=recipients',
				{
					action: 'add',
					last_name: input_last_name.val(),
					first_name: input_first_name.val(),
					second_name: input_second_name.val(),
					age: input_age.val(),
					diagnosis: input_diagnosis.val()
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
	var
		dialog_table = CreateTable(dialog),
		input_last_name = CreateInputWithLabel(dialog_table, 'Фамилия:', ''),
		input_first_name = CreateInputWithLabel(dialog_table, 'Имя:', ''),
		input_second_name = CreateInputWithLabel(dialog_table, 'Отчество:', ''),
		input_age = CreateInputWithLabel(dialog_table, 'Возраст:', ''),
		input_diagnosis = CreateInputWithLabel(dialog_table, 'Диагноз:', '');

	CreateButton(content_object, '', 'Добавить рецепт').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}

function CreateModel_orders_drugs(content_object, callback)
{
	CreateSubCaption(content_object, 'Заказы лекарств');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=orders_drugs', function(data)
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
					var accordion_item_object = AddAccordionItem(accordion, value['id'], value['drug_name'] + ' (' + value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name'] + ')');

					CreateSubContent(accordion_item_object).html('Количество лекарства: ' + value['quantity']);
					CreateSubContent(accordion_item_object).html('Способ применения: ' + value['way_apply']);
					CreateSubContent(accordion_item_object).html('Общая цена: ' + value['total']);
					CreateSubContent(accordion_item_object).html('Заказ создан и ожидает прибытия компонентов: ' + value['date_added']);
					CreateSubContent(accordion_item_object).html('Заказ в изготовлении: ' + (value['date_started'] != null ? value['date_started'] : '-'));
					CreateSubContent(accordion_item_object).html('Заказ изготовлен и ожидает закрытия: ' + (value['date_made'] != null ? value['date_made'] : '-'));
					CreateSubContent(accordion_item_object).html('Заказ доставлен клиенту и закрыт: ' + (value['date_sell'] != null ? value['date_sell'] : '-'));

					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить заказ').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('recipient_id', value['recipient_id'])
							.attr('drug_id', value['drug_id'])
							.attr('way_apply', value['way_apply'])
							.attr('quantity', value['quantity'])
							.attr('date_added', value['date_added'])
							.attr('date_started', value['date_started'])
							.attr('date_made', value['date_made'])
							.attr('date_sell', value['date_sell'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить заказ').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=orders_drugs',
						{
							action: 'delete',
							id: value['id'],
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

	Loaders['orders_drugs'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение заказа',
	{
		autoOpen: false,
		modal: true,
		width: 700,
		height: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=orders_drugs',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					recipient: edit_select_recipient.children().first().val(),
					drug: edit_select_drug.children().first().val(),
					way_apply: edit_input_way_apply.val(),
					quantity: edit_input_quantity.val(),
					date_added: edit_input_date_added.val(),
					date_started: edit_input_date_started.val(),
					date_made: edit_input_date_made.val(),
					date_sell: edit_input_date_sell.val()
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
			var recipient_id = edit_dialog.attr('recipient_id'), drug_id = edit_dialog.attr('drug_id');
			edit_select_recipient.children().first().val(recipient_id);
			edit_select_drug.children().first().val(drug_id);
			edit_input_way_apply.val(edit_dialog.attr('way_apply'));
			edit_input_quantity.val(edit_dialog.attr('quantity'));
			edit_input_date_added.val(edit_dialog.attr('date_added'));
			edit_input_date_started.val(edit_dialog.attr('date_started'));
			edit_input_date_made.val(edit_dialog.attr('date_made'));
			edit_input_date_sell.val(edit_dialog.attr('date_sell'));

			DisableDialogButton(edit_dialog, 0, false);

			_JSONLoad(edit_select_drug, './?page=drugs', function(data)
			{
				edit_select_drug.empty();
				var selectmenu = CreateSelectMenu(edit_select_drug, 'dialog');

				DisableDialogButton(edit_dialog, 0, IsButtonDisabled(edit_dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name'], value['id'] == drug_id);
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(edit_select_recipient, './?page=recipients', function(data)
			{
				edit_select_recipient.empty();
				var selectmenu = CreateSelectMenu(edit_select_recipient, 'dialog');

				DisableDialogButton(edit_dialog, 0, IsButtonDisabled(edit_dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name'] + ' (' + value['age'] + ' лет)', value['id'] == recipient_id);
				});

				selectmenu.selectmenu();
			});
		}
	});

	var
		edit_dialog_table = CreateTable(edit_dialog),
		edit_select_recipient = CreateInput(edit_dialog_table, 'Рецепт:'),
		edit_select_drug = CreateInput(edit_dialog_table, 'Лекарство:'),
		edit_input_way_apply = CreateInputWithLabel(edit_dialog_table, 'Способ применения:', ''),
		edit_input_quantity = CreateInputWithLabel(edit_dialog_table, 'Количество:', ''),
		edit_input_date_added = CreateDatePickerWithLabel(edit_dialog_table, 'Дата добавления заказа:', ''),
		edit_input_date_started = CreateDatePickerWithLabel(edit_dialog_table, 'Дата начала изготовления заказа:', ''),
		edit_input_date_made = CreateDatePickerWithLabel(edit_dialog_table, 'Дата изготовления заказа:', ''),
		edit_input_date_sell = CreateDatePickerWithLabel(edit_dialog_table, 'Дата закрытия заказа:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление заказа',
	{
		autoOpen: false,
		modal: true,
		width: 700,
		height: 250,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=orders_drugs',
				{
					action: 'add',
					recipient: select_recipient.children().first().val(),
					drug: select_drug.children().first().val(),
					way_apply: input_way_apply.val(),
					quantity: input_quantity.val()
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
			DisableDialogButton(dialog, 0, false);

			_JSONLoad(select_drug, './?page=drugs', function(data)
			{
				select_drug.empty();
				var selectmenu = CreateSelectMenu(select_drug, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(select_recipient, './?page=recipients', function(data)
			{
				select_recipient.empty();
				var selectmenu = CreateSelectMenu(select_recipient, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name'] + ' (' + value['age'] + ' лет)');
				});

				selectmenu.selectmenu();
			});
		}
	});
	var
		dialog_table = CreateTable(dialog),
		select_recipient = CreateInput(dialog_table, 'Рецепт:'),
		select_drug = CreateInput(dialog_table, 'Лекарство:'),
		input_way_apply = CreateInputWithLabel(dialog_table, 'Способ применения:', ''),
		input_quantity = CreateInputWithLabel(dialog_table, 'Количество:', '');

	CreateButton(content_object, '', 'Добавить заказ').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}

function CreateModel_orders_medicaments(content_object, callback)
{
	CreateSubCaption(content_object, 'Заказы медикаментов');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=orders_medicaments', function(data)
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
					var accordion_item_object = AddAccordionItem(accordion, value['id'], value['medicament_name']);

					CreateSubContent(accordion_item_object).html('Заказ лекарства: ' + value['drug_name']);
					CreateSubContent(accordion_item_object).html('Количество медикамента: ' + value['quantity']);
					CreateSubContent(accordion_item_object).html('Общая цена: ' + value['total']);
					CreateSubContent(accordion_item_object).html('Заказ создан: ' + value['date_added']);
					CreateSubContent(accordion_item_object).html('Заказ доставлен и закрыт: ' + (value['date_complete'] != null ? value['date_complete'] : '-'));

					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить заказ').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('orders_drug', value['orders_drugs_id'])
							.attr('medicament', value['medicament_id'])
							.attr('quantity', value['quantity'])
							.attr('date_added', value['date_added'])
							.attr('date_complete', value['date_complete'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить заказ').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=orders_medicaments',
						{
							action: 'delete',
							id: value['id'],
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

	Loaders['orders_medicaments'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение заказа',
	{
		autoOpen: false,
		modal: true,
		width: 700,
		height: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=orders_medicaments',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					orders_drug: edit_select_orders_drug.children().first().val(),
					medicament: edit_select_medicament.children().first().val(),
					quantity: edit_input_quantity.val(),
					date_added: edit_input_date_added.val(),
					date_complete: edit_input_date_complete.val()
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
			var orders_drugs_id = edit_dialog.attr('orders_drug'), medicament_id = edit_dialog.attr('medicament');

			edit_select_orders_drug.children().first().val(orders_drugs_id);
			edit_select_medicament.children().first().val(medicament_id);
			edit_input_quantity.val(edit_dialog.attr('quantity'));
			edit_input_date_added.val(edit_dialog.attr('date_added'));
			edit_input_date_complete.val(edit_dialog.attr('date_complete'));

			DisableDialogButton(dialog, 0, false);

			_JSONLoad(edit_select_orders_drug, './?page=orders_drugs', function(data)
			{
				edit_select_orders_drug.empty();
				var selectmenu = CreateSelectMenu(edit_select_orders_drug, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['drug_name'] + ' (' + value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name'] + ')', value['id'] == orders_drugs_id);
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(edit_select_medicament, './?page=medicaments', function(data)
			{
				edit_select_medicament.empty();
				var selectmenu = CreateSelectMenu(edit_select_medicament, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name'], value['id'] == medicament_id);
				});

				selectmenu.selectmenu();
			});
		}
	});

	var
		edit_dialog_table = CreateTable(edit_dialog),
		edit_select_orders_drug = CreateInput(edit_dialog_table, 'Заказ лекарства:'),
		edit_select_medicament = CreateInput(edit_dialog_table, 'Медикамент:'),
		edit_input_quantity = CreateInputWithLabel(edit_dialog_table, 'Количество:', ''),
		edit_input_date_added = CreateDatePickerWithLabel(edit_dialog_table, 'Дата добавления заказа:', ''),
		edit_input_date_complete = CreateDatePickerWithLabel(edit_dialog_table, 'Дата закрытия заказа:', '');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление заказа',
	{
		autoOpen: false,
		modal: true,
		width: 700,
		height: 250,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=orders_medicaments',
				{
					action: 'add',
					orders_drug: select_orders_drug.children().first().val(),
					medicament: select_medicament.children().first().val(),
					quantity: input_quantity.val()
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
			DisableDialogButton(dialog, 0, false);

			_JSONLoad(select_orders_drug, './?page=orders_drugs', function(data)
			{
				select_orders_drug.empty();
				var selectmenu = CreateSelectMenu(select_orders_drug, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['drug_name'] + ' (' + value['last_name'] + ' ' + value['first_name'] + ' ' + value['second_name'] + ')');
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(select_medicament, './?page=medicaments', function(data)
			{
				select_medicament.empty();
				var selectmenu = CreateSelectMenu(select_medicament, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});

	var
		dialog_table = CreateTable(dialog),
		select_orders_drug = CreateInput(dialog_table, 'Заказ лекарства:'),
		select_medicament = CreateInput(dialog_table, 'Медикамент:'),
		input_quantity = CreateInputWithLabel(dialog_table, 'Количество:', '');

	CreateButton(content_object, '', 'Добавить заказ').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}