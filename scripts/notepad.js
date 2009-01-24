function uiLine()
{
  document.forms[0].tib.value += '---------------------------------------------------------------------\n';
}

function uiToday()
{
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  document.forms[0].tib.value += month + "/" + day + "/" + year + "\n";
}
