function save()
{
  createCookie('motu', document.forms[0].tib.value);
}

function load()
{
  var x = readCookie('motu')
  if (x)
    document.forms[0].tib.value = x;
  else
    document.forms[0].tib.value = '';
}

function allnew()
{
  document.forms[0].tib.value = '';
  save();
}
