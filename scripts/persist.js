function save()
{
  var x = document.forms[0].tib.value;
  if (escape(x).length > 3800)
  {
    alert('Sorry, but your session file is too large to save.\nPlease reduce size and try again.');
    return;
  }
  createCookie('motu', document.forms[0].tib.value, 'Sun, 17-Jan-2038 19:14:07 GMT');
}

function allnew()
{
  document.forms[0].tib.value = '';
  save();
}

function load()
{
  var x = readCookie('motu')
  if (x)
    document.forms[0].tib.value = x;
  else
    allnew();
}
