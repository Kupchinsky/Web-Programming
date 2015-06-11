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
					active: false,
					heightStyle: "content"
				});
			}
		});

		if (Reload)
		{
			Loaders['technologies']();
			Loaders['storage_medicaments']();
		}
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
					{
						Reload = true;
						load();
					}
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

function CreateModel_technologies(content_object, callback)
{
	CreateSubCaption(content_object, 'Технологии');

	var subcontent_object = CreateSubContent(content_object), accordion_item_sub_object, load = function()
	{
		_JSONLoad(subcontent_object, './?page=technologies', function(data)
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

					CreateSubContent(accordion_item_object).html('Лекарство: ' + value['drug_name']);
					CreateSeparator(accordion_item_object);
					load_components(CreateSubContent(accordion_item_object), value['id']);

					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Добавить компонент').click(function()
					{
						add_component_dialog
							.attr('technology_id', value['id'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_dialog
							.attr('edit_id', value['id'])
							.attr('edit_name', value['name'])
							.attr('drug_id', value['drug_id'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=technologies',
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
					active: false,
					heightStyle: "content"
				});
			}
		});

		Reload = false;
	}, load_components = function(_accordion_item_sub_object, id)
	{
		accordion_item_sub_object = _accordion_item_sub_object;

		_JSONLoad(accordion_item_sub_object, './?page=technologies_medicaments&technology=' + id, function(data)
		{
			accordion_item_sub_object.html('Компоненты приготовления:');

			if (data.length == 0)
			{
				CreateAlert(accordion_item_sub_object, 'Данные отсутствуют');
			}
			else
			{
				var accordion_components = CreateAccordion(accordion_item_sub_object, '');

				$(data).each(function(key, value)
				{
					var accordion_item_object = AddAccordionItem(accordion_components, value['medicament_id'], value['medicament_name']);

					CreateSubContent(accordion_item_object).html('Количество: ' + value['quantity']);
					CreateSeparator(accordion_item_object);
					CreateButton(accordion_item_object, '', 'Изменить').click(function()
					{
						edit_component_dialog
							.attr('technology_id', id)
							.attr('medicament_id', value['medicament_id'])
							.attr('quantity', value['quantity'])
							.dialog('open');
					});
					CreateButton(accordion_item_object, '', 'Удалить').click(function()
					{
						if (!confirm('Вы уверены?'))
							return;

						$.post('./?page=technologies_medicaments',
						{
							action: 'delete',
							technology: id,
							medicament: value['medicament_id']
						},
						function(data)
						{
							if (data.success)
								load_components(accordion_item_sub_object, id);
							else
								alert('Что-то пошло не так!');
						}, 'json');
					});
				});

				accordion_components.accordion(
				{
					collapsible: true,
					active: false,
					heightStyle: "content"
				});
			}
		});
	};

	Loaders['technologies'] = load;

	var add_component_dialog = CreateDialog(content_object, 'Добавление компонента',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=technologies_medicaments',
				{
					action: 'add',
					technology: add_component_dialog.attr('technology_id'),
					medicament: add_component_select_medicament.children().first().val(),
					quantity: add_component_input_quantity.val()
				},
				function(data)
				{
					if (data.success)
						load_components(accordion_item_sub_object, add_component_dialog.attr('technology_id'));
					else
						alert('Что-то пошло не так!');

					add_component_dialog.dialog('close');
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
			_JSONLoad(add_component_select_medicament, './?page=medicaments', function(data)
			{
				add_component_select_medicament.empty();
				var selectmenu = CreateSelectMenu(add_component_select_medicament, 'dialog');

				DisableDialogButton(dialog, 0, data.length == 0);

				$(data).each(function(key, value)
				{
					AddSelectMenuItem(selectmenu, value['id'], value['name']);
				});

				selectmenu.selectmenu();
			});
		}
	});
	var add_component_dialog_table = CreateTable(add_component_dialog), add_component_select_medicament = CreateInput(add_component_dialog_table, 'Медикамент:'), add_component_input_quantity = CreateInputWithLabel(add_component_dialog_table, 'Количество:', '');

	var edit_component_dialog = CreateDialog(content_object, 'Изменение компонента',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=technologies_medicaments',
				{
					action: 'edit',
					technology: edit_component_dialog.attr('technology_id'),
					medicament: edit_component_dialog.attr('medicament_id'),
					quantity: edit_component_input_quantity.val()
				},
				function(data)
				{
					if (data.success)
						load_components(accordion_item_sub_object, edit_component_dialog.attr('technology_id'));
					else
						alert('Что-то пошло не так!');

					edit_component_dialog.dialog('close');
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
			edit_component_input_quantity.val(edit_component_dialog.attr('quantity'));
		}
	});
	var edit_component_dialog_table = CreateTable(edit_component_dialog), edit_component_input_quantity = CreateInputWithLabel(edit_component_dialog_table, 'Количество:', '');

	var edit_dialog = CreateDialog(content_object, 'Изменение технологии',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Изменить',
			click: function()
			{
				$.post('./?page=technologies',
				{
					action: 'edit',
					id: edit_dialog.attr('edit_id'),
					name: edit_input_name.val(),
					drug: edit_select_drug.children().first().val()
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
			var id = edit_dialog.attr('edit_id'), drug_id = edit_dialog.attr('drug_id');
			edit_input_name.val(edit_dialog.attr('edit_name'));

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
		}
	});
	var edit_dialog_table = CreateTable(edit_dialog), edit_input_name = CreateInputWithLabel(edit_dialog_table, 'Название:', ''), edit_select_drug = CreateInput(edit_dialog_table, 'Лекарство:');

	CreateSeparator(content_object);
	var dialog = CreateDialog(content_object, 'Добавление технологии',
	{
		autoOpen: false,
		modal: true,
		width: 400,
		buttons: [
		{
			text: 'Добавить',
			click: function()
			{
				$.post('./?page=technologies',
				{
					action: 'add',
					name: input_name.val(),
					drug: select_drug.children().first().val()
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
	var dialog_table = CreateTable(dialog), input_name = CreateInputWithLabel(dialog_table, 'Название:', ''), select_drug = CreateInput(dialog_table, 'Лекарство:');

	CreateButton(content_object, '', 'Добавить технологию').click(function()
	{
		dialog.dialog('open');
	});

	CreateLineSeparator(content_object);

	load();
}