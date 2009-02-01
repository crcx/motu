function save()
{
  var x = document.forms[0].tib.value;
  if (escape(x).length > 3800)
  {
    alert('Sorry, but your session file is too large to save.\nPlease reduce size and try again.');
    return;
  }
  widget.setPreferenceForKey(document.forms[0].tib.value, 'motu');
}

function allnew()
{
  document.forms[0].tib.value = '';
  save();
}

function load()
{
  var x = widget.preferenceForKey('motu');
  document.forms[0].tib.value = x;
}
