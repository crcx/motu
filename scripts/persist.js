function save()
{
  createCookie('retrotib', document.forms[0].tib.value);
}

function load()
{
  var x = readCookie('retrotib')
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
