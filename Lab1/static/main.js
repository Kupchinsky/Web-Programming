var newpayform = false;

function validateEmail(email)
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(function()
{
	$('#newpay').click(function()
	{
		newpayform = !newpayform;

		if (newpayform)
			$('#newpayform').fadeIn();
		else
			$('#newpayform').fadeOut();
	});
	
	$('#newpayform > form').children('[name="phone"]').blur(function ()
	{
		var regexp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/

		if ($(this).val().length > 0 && !regexp.test($(this).val()))
		{
			alert('Некорректный номер телефона!');
			$(this).val('');
		}
	});

	$('#newpayform > form').children('[name="email"]').blur(function ()
	{
		if ($(this).val().length > 0 && !validateEmail($(this).val()))
		{
			alert('Некорректный E-Mail адрес!');
			$(this).val('');
		}
	});

	$('#newpayform').submit(function()
	{
		var _check = [
			$('#newpayform > form').children('[name="personname"]'),
			$('#newpayform > form').children('[name="targetaddress"]'),
			$('#newpayform > form').children('[name="phone"]')
		];

		for (var i = 0; i < _check.length; i++)
		{
			if (_check[i].val().length == 0)
			{
				alert('Не заполнено поле "' + _check[i].attr('placeholder') + '"!');
				return false;
			}
		}

		return true;
	});
});