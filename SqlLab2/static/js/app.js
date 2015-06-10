var Loaders = {}, Reload = false;

$(function()
{
	CreateTab('management_drugs', 'Лекарства', function(content_object, callback)
	{
		CreateModel_drugs_types(content_object, callback);
		CreateModel_drugs_applytypes(content_object, callback);
		CreateModel_drugs_subtypes(content_object, callback);
		CreateModel_drugs(content_object, callback);
	});

	CreateTab('management_internalproduction', 'Внутреннее производство', function(content_object, callback)
	{
		CreateModel_medicaments(content_object, callback);
		CreateModel_technologies(content_object, callback);
	});

	CreateTab('management_storage', 'Склад', function(content_object, callback)
	{
	});

	CreateTab('management_orders', 'Заказы', function(content_object, callback)
	{
	});

	CreateTab('queries', 'Запросы к системе', function(content_object, callback)
	{
	});

	CreateTab('er', 'ER диаграмма', function(content_object, callback)
	{
		callback('<img src="static/images/er.png" alt="">');
	});

	$('#tabs').tabs();
});

function _JSONLoad(content_object, url, callback)
{
	content_object.html('<img src="static/images/ajax-loader.gif" alt="">');
	$.getJSON(url, callback);
}

function CreateTab(short_name, name, callback)
{
	$('#tabs').children('ul').first().append('<li id="' + short_name + '-tab-link"><a id="" href="#tabs-' + short_name + '" class="big">' + name + '</a></li>');
	$('#tabs').append('<div id="tabs-' + short_name + '"></div>');

	var tab = $('#tabs-' + short_name);

	callback(tab, function(content)
	{
		tab.html(content);
	});
}

function AddAccordionItem(accordion_object, id, caption)
{
	accordion_object.append('<h4>' + caption + '</h4><div item-id="' + id + '"></div>');
	return accordion_object.children('div').last();
}

function CreateAccordion(content_object, classname)
{
	content_object.append('<div class="' + classname + ' plus_bottom"></div>');
	return content_object.children().last();
}

function CreateButton(content_object, classname, caption)
{
	content_object.append('<button class="' + classname + ' plus_bottom">' + caption + '</button>');
	return content_object.children().last().button();
}

function CreateSeparator(content_object)
{
	content_object.append('<div class="plus_bottom"></div>');
}

function CreateLineSeparator(content_object)
{
	content_object.append('<div class="plus_bottom"></div><hr>');
}

function CreateSubCaption(content_object, text)
{
	content_object.append('<div class="subtitle">' + text + '</div>');
}

function CreateSubContent(content_object)
{
	content_object.append('<div></div>');
	return content_object.children().last();
}

function CreateAlert(content_object, text)
{
	content_object.html('<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em; font-size: 10pt"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' + text + '</p></div>');
}

function CreateDialog(content_object, title, options)
{
	content_object.append('<div title="' + title + '"></div>');
	return content_object.children().last().dialog(options);
}

function CreateSelectMenu(content_object, classname)
{
	content_object.append('<select class="' + classname + '"></select>');
	return content_object.children().last();
}

function AddSelectMenuItem(selectmenu_object, id, title, selected)
{
	selectmenu_object.append('<option value=' + id + '>' + title + '</option>');

	if (typeof(selected) != 'undefined' && selected)
		selectmenu_object.children('option').last().prop('selected', true);
}

function CreateTable(content_object)
{
	content_object.append('<table style="width: 100%"><tbody></tbody></table>');
	return content_object.children().last();
}

function CreateInput(table_object, caption)
{
	table_object.children('tbody').append('<tr><td style="width: 50%">' + caption + '</td><td></td></tr>');
	return table_object.children('tbody').children('tr').last().children('td').last();
}

function CreateInputWithLabel(table_object, caption, def_value)
{
	return CreateInput(table_object, caption).append('<input type="text" value="' + def_value + '"></td></tr>').children('input').first();
}

function DisableDialogButton(dialog_object, index, disabled)
{
	var buttons = dialog_object.dialog('option', 'buttons');
	buttons[index].disabled = disabled;
	dialog_object.dialog('option', 'buttons', buttons);
}

function IsButtonDisabled(dialog_object, index)
{
	var buttons = dialog_object.dialog('option', 'buttons');
	return typeof(buttons[index].disabled) != 'undefined' && buttons[index].disabled;
}