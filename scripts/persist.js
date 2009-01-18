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
  document.forms[0].tib.value  = 'Motu is a personal notepad and programming environment.\n\n';
  document.forms[0].tib.value += "It's designed to allow short (~4k) notes to be written and edited, and to allow easy mixing of Forth code and comments. You can run the Forth code by highlighting it and clicking the Evaluate button on the right. The results of your code being run will display in the box below.\n\n";
  document.forms[0].tib.value += 'If you run into problems, save your session and reload Motu. You can then reevaluate your code after fixing any bugs you encounter.\n';
  document.forms[0].tib.value += '---------------------------------------------------------------------\n';
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
