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


function uiTime()
{
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (minutes < 10)
  {
    minutes = "0" + minutes;
  }
  document.forms[0].tib.value += hours + ":" + minutes + " ";
  if (hours > 11)
    document.forms[0].tib.value += "PM\n";
  else
    document.forms[0].tib.value += "AM\n";
}
