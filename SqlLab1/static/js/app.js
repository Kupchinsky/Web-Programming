$(function()
{
	MainTab = $('#tabs');

	CreateModel('Students', 'Студенты', 'Введите имя или группу', 'students', {
		Loader:
		{
			Description: function(value)
			{
				return value['name'] + ' (' + value['group_name'] + ')';
			},
			ChildCode: function(value)
			{
				return 'Изменить данные, Отчислить, Перевести в другую группу, Экзамены';
			}
		},
		Search: function(matcher, value)
		{
			return matcher.test(value['name']) || matcher.test(value['group_name']);
		}
	});
	Loader.FromJson('Students', 'index.php?page=students');

	CreateModel('Groups', 'Группы', 'Введите название', 'groups', {
		Loader:
		{
			Description: function(value)
			{
				return value['name'];
			},
			ChildCode: function(value)
			{
				return 'Переименовать, Удалить, Студенты';
			}
		},
		Search: function(matcher, value)
		{
			return matcher.test(value['name']);
		}
	});
	Loader.FromJson('Groups', 'index.php?page=groups');

	CreateModel('Subjects', 'Предметы', 'Введите название', 'subjects', {
		Loader:
		{
			Description: function(value)
			{
				return value['name'];
			},
			ChildCode: function(value)
			{
				return 'Переименовать, Удалить';
			}
		},
		Search: function(matcher, value)
		{
			return matcher.test(value['name']);
		}
	});
	Loader.FromJson('Subjects', 'index.php?page=subjects');

	MainTab.tabs({
		active: ActiveTab
	});
});

function CreateAlert(jQObj, text)
{
	jQObj.html('<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em; font-size: 10pt">' +
				'<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' +
				text + '</p>' +
				'</div>');
}

function CreateModel(ModelName, TabName, SearchTitle, prefix, callbacks)
{
	Storage[ModelName] = [];

	Loader.Models[ModelName] = callbacks.Loader;
	Search.Models[ModelName] = callbacks.Search;

	MainTab.children('ul').first().append('<li id="' + prefix + '-tab-link"><a id="" href="#tabs-' + prefix + '">' + TabName + '</a></li>');
	MainTab.append('<div id="tabs-' + prefix + '">' +
									'<div class="pd-bottom">' +
									'Поиск: <input id="' + prefix + '-ac" title="' + SearchTitle + '" disabled>' +
									'<div class="pd-top">' +
									'<button id="' + prefix + '-search" disabled>Найти</button>' +
									'<button id="' + prefix + '-search-reset" disabled>Сбросить</button>' +
									'</div>' +
									'</div>' +
									'<div id="' + prefix + '-acc" class="acc"></div>' +
									'<div class="pd-top">' +
									'<button id="' + prefix + '-add" disabled>Добавить</button>' +
									'</div>' +
									'</div>');

	Sel[ModelName] = {
		Accordion: $('#' + prefix + '-acc'),
		Add: $('#' + prefix + '-add').button(),
		TabLink: $('#' + prefix + '-tab-link'),
		Search:
		{
			Input: $('#' + prefix + '-ac'),
			Submit: $('#' + prefix + '-search').button(),
			Reset: $('#' + prefix + '-search-reset').button()
		}
	};

	TabsCount++;

	if (location.hash.length > 1 && location.hash.substr(1) == ModelName)
		ActiveTab = TabsCount;
}

var MainTab;
var Sel = {};
var Storage = {};
var TabsCount = -1, ActiveTab = 0;

var Loader = {
	FromArray: function(ModelName, DataArray)
	{
		var SelObj = Sel[ModelName], code = '';

		$(DataArray).each(function(key, value)
		{
			code += '<h4>' + Loader.Models[ModelName].Description(value) + '</h4><div item-id="' + value['id'] + '">' + Loader.Models[ModelName].ChildCode(value) + '</div>';
		});

		SelObj.Accordion.html(code);

		if (typeof(SelObj.Accordion.attr('is-refresh')) != 'undefined')
			SelObj.Accordion.accordion('refresh');
		else
		{
			SelObj.Accordion.accordion({
				heightStyle: 'content',
				collapsible: true,
				active: false
			}).attr('is-refresh', '');
		}

		SelObj.Search.Input.autocomplete(
		{
			source: function(request, response)
			{
				response(Search.Do(ModelName, request.term, true));
			}
		}).prop('disabled', false);
		SelObj.TabLink.off('click').click(function()
		{
			location.hash = ModelName;
		});
		SelObj.Add.prop('disabled', false).button('refresh').off('click').click(function()
		{
			alert('add');
		});
		SelObj.Search.Submit.prop('disabled', false).button('refresh').off('click').click(function()
		{
			if (SelObj.Search.Input.val().length == 0)
				return;

			Search.ShowResults(ModelName);
		});
		SelObj.Search.Reset.prop('disabled', false).button('refresh').off('click').click(function()
		{
			SelObj.Search.Input.val('');
			Search.ShowResults(ModelName);
		});
	},
	FromJson: function(ModelName, DataUrl)
	{
		var SelObj = Sel[ModelName];
		SelObj.Accordion.html('<img src="static/images/ajax-loader.gif" alt="">');

		$.getJSON(DataUrl, function(DataArray)
		{
			SelObj.Accordion.empty();

			Storage[ModelName] = DataArray;
			Loader.FromArray(ModelName, Storage[ModelName]);
		});
	},
	Models: {}
};

var Search = {
	ShowResults: function(ModelName)
	{
		var result = Search.Do(ModelName, false);

		if (result.length == 0)
			CreateAlert(Sel[ModelName].Accordion, 'Ничего не найдено!');
		else
			Loader.FromArray(ModelName, result);
	},
	Do: function(ModelName, result_for_autocomplete)
	{
		var pattern = Sel[ModelName].Search.Input.val();

		if (pattern.length == 0)
			return Storage[ModelName];

		var matcher = new RegExp($.ui.autocomplete.escapeRegex(pattern), "i"), result = $.grep(Storage[ModelName], function(value)
		{
			return Search.Models[ModelName](matcher, value);
		});

		if (result_for_autocomplete)
		{
			$(result).each(function (key, value)
			{
				result[key] = value['name'];
			});
		}

		return result;
	},
	Models: {}
};