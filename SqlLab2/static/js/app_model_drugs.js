function CreateModel_drugs_types(content_object, callback)
{
	CreateSubCaption(content_object, 'Типы лекарств');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=drugs_types', function(data)
		{
			if (data.length == 0)
			{
				CreateAlert(subcontent_object, 'Данные отсутствуют');
				button_delete.prop('disabled', true).button('refresh');
			}
			else
			{
				button_delete.prop('disabled', false).button('refresh');
				subcontent_object.empty();

				var selectmenu = CreateSelectMenu(subcontent_object, '');

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			}
		});
		
		if (Reload)
			Loaders['drugs_applytypes']();
	};

	Loaders['drugs_types'] = load;

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление типа',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=drugs_types',
				{
					action: 'add',
					name: input_name.val()
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
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', '');

	var button_delete = CreateButton(content_object, '', 'Удалить тип').prop('disabled', true).button('refresh').click(function()
	{
		if (!confirm('Вы уверены?'))
			return;

		var selectmenu = subcontent_object.children('select'), id = selectmenu.val();

		$.post('./?page=drugs_types',
		{
			action: 'delete',
			id: id
		},
		function(data)
		{
			if (data.success)
			{
				Reload = true;
				load();
			}
			else
				alert('Что-то пошло не так!');
		}, 'json');
	});

	CreateButton(content_object, '', 'Добавить тип').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}

function CreateModel_drugs_applytypes(content_object, callback)
{
	CreateSubCaption(content_object, 'Типы применения лекарств');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=drugs_applytypes', function(data)
		{
			if (data.length == 0)
			{
				CreateAlert(subcontent_object, 'Данные отсутствуют');
				button_delete.prop('disabled', true).button('refresh');
			}
			else
			{
				button_delete.prop('disabled', false).button('refresh');
				subcontent_object.empty();

				var selectmenu = CreateSelectMenu(subcontent_object, '');

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			}
		});

		if (Reload)
			Loaders['drugs_subtypes']();
	};

	Loaders['drugs_applytypes'] = load;

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление типа применения',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=drugs_applytypes',
				{
					action: 'add',
					name: input_name.val()
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
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', '');

	var button_delete = CreateButton(content_object, '', 'Удалить тип').prop('disabled', true).button('refresh').click(function()
	{
		if (!confirm('Вы уверены?'))
			return;

		var selectmenu = subcontent_object.children('select'), id = selectmenu.val();

		$.post('./?page=drugs_applytypes',
		{
			action: 'delete',
			id: id
		},
		function(data)
		{
			if (data.success)
			{
				Reload = true;
				load();
			}
			else
				alert('Что-то пошло не так!');
		}, 'json');
	});

	CreateButton(content_object, '', 'Добавить тип').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);
	
	load();
}

function CreateModel_drugs_subtypes(content_object, callback)
{
	CreateSubCaption(content_object, 'Подтипы лекарств');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=drugs_subtypes', function(data)
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

					CreateSubContent(accordion_item_object).html('Тип: ' + value['type_name']);
					CreateSubContent(accordion_item_object).html('Тип применения: ' + value['applytype_name']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('edit_name', value['name'])
							.attr('type_id', value['type_id'])
							.attr('applytype_id', value['applytype_id'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=drugs_subtypes',
						{
							action: 'delete',
							id: value['id']
						},
						function(data)
						{
							if (data.success)
							{
								Reload = true;
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

		if (Reload)
			Loaders['drugs']();
	};

	Loaders['drugs_subtypes'] = load;

	var edit_dialog = CreateDialog(content_object, 'Изменение подтипа',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=drugs_subtypes',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					name: edit_input_name.val(),
					type: edit_select_type.children().first().val(),
					applytype: edit_select_applytype.children().first().val()
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
			var id = edit_dialog.attr('edit_id'), type_id = edit_dialog.attr('type_id'), applytype_id = edit_dialog.attr('applytype_id');
			edit_input_name.val(edit_dialog.attr('edit_name'));

			DisableDialogButton(edit_dialog, 0, false);

			_JSONLoad(edit_select_type, './?page=drugs_types', function(data)
			{
				edit_select_type.empty();
				var selectmenu = CreateSelectMenu(edit_select_type, 'dialog');

				DisableDialogButton(edit_dialog, 0, IsButtonDisabled(edit_dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name'], value['id'] == type_id);
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(edit_select_applytype, './?page=drugs_applytypes', function(data)
			{
				edit_select_applytype.empty();
				var selectmenu = CreateSelectMenu(edit_select_applytype, 'dialog');

				DisableDialogButton(edit_dialog, 0, IsButtonDisabled(edit_dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name'], value['id'] == applytype_id);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_name = CreateInputWithLabel(edit_dialog_table, 'Название:', ''), edit_select_type = CreateInput(edit_dialog_table, 'Тип:'), edit_select_applytype = CreateInput(edit_dialog_table, 'Тип применения:');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление подтипа',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=drugs_subtypes',
				{
					action: 'add',
					name: input_name.val(),
					type: select_type.children().first().val(),
					applytype: select_applytype.children().first().val()
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

			_JSONLoad(select_type, './?page=drugs_types', function(data)
			{
				select_type.empty();
				var selectmenu = CreateSelectMenu(select_type, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});

			_JSONLoad(select_applytype, './?page=drugs_applytypes', function(data)
			{
				select_applytype.empty();
				var selectmenu = CreateSelectMenu(select_applytype, 'dialog');

				DisableDialogButton(dialog, 0, IsButtonDisabled(dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', ''), select_type = CreateInput(dialog_table, 'Тип:'), select_applytype = CreateInput(dialog_table, 'Тип применения:');

	CreateButton(content_object, '', 'Добавить подтип').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}

function CreateModel_drugs(content_object, callback)
{
	CreateSubCaption(content_object, 'Лекарства');

	var subcontent_object = CreateSubContent(content_object), load = function()
	{
		_JSONLoad(subcontent_object, './?page=drugs', function(data)
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
					CreateSubContent(accordion_item_object).html('Тип: ' + value['type_name']);
					CreateSubContent(accordion_item_object).html('Тип применения: ' + value['applytype_name']);
					CreateSubContent(accordion_item_object).html('Подтип: ' + value['subtype_name']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('edit_name', value['name'])
							.attr('edit_price', value['price'])
							.attr('subtype_id', value['subtype_id'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=drugs',
						{
							action: 'delete',
							id: value['id']
						},
						function(data)
						{
							if (data.success)
							{
								Reload = true;
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

		// Остановка перегрузки
		Reload = false;
	};

	Loaders['drugs'] = load;

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
				$.post('./?page=drugs',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					name: edit_input_name.val(),
					price: edit_input_price.val(),
					subtype: edit_select_subtype.children().first().val()
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
			var id = edit_dialog.attr('edit_id'), subtype_id = edit_dialog.attr('subtype_id');
			edit_input_name.val(edit_dialog.attr('edit_name'));
			edit_input_price.val(edit_dialog.attr('edit_price'));

			_JSONLoad(edit_select_subtype, './?page=drugs_subtypes', function(data)
			{
				edit_select_subtype.empty();
				var selectmenu = CreateSelectMenu(edit_select_subtype, 'dialog');

				DisableDialogButton(edit_dialog, 0, IsButtonDisabled(edit_dialog, 0) || data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name'], value['id'] == subtype_id);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_name = CreateInputWithLabel(edit_dialog_table, 'Название:', ''), edit_input_price = CreateInputWithLabel(edit_dialog_table, 'Цена:', ''), edit_select_subtype = CreateInput(edit_dialog_table, 'Подтип:');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление лекарства',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=drugs',
				{
					action: 'add',
					name: input_name.val(),
					price: input_price.val(),
					subtype: select_subtype.children().first().val()
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
			_JSONLoad(select_subtype, './?page=drugs_subtypes', function(data)
			{
				select_subtype.empty();
				var selectmenu = CreateSelectMenu(select_subtype, 'dialog');

				DisableDialogButton(dialog, 0, data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', ''), input_price = CreateInputWithLabel(dialog_table, 'Цена:', ''), select_subtype = CreateInput(dialog_table, 'Подтип:');

	CreateButton(content_object, '', 'Добавить лекарство').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}