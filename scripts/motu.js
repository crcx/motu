/**********************************************************************
 * selection(txtarea)
 * Returns the highlighted text from a textarea
 **********************************************************************/
function selection(txtarea)
{
  var sl = (txtarea.value).substring(txtarea.selectionStart, txtarea.selectionEnd);
  return sl;
}



/**********************************************************************
 * runCode()
 * Set tib to the highlighted text and run the Retro interpreter
 **********************************************************************/
function runCode()
{
  tib = selection(document.forms[0].tib);
  var session = new uki();
  document.forms[0].output.value = session.eval(tib);
}



/**********************************************************************
 * bootstrap()
 * Setup everything and initialize the image
 **********************************************************************/
function bootstrap()
{
  /* Save some system state (for 'reset vm' functionality) */
  startLast = image[2];
  startHeap = image[3];
}


/**********************************************************************
 * resetRetro()
 * Reset the heap, stack, dictionary to a default settings and reboot
 * the Retro image
 **********************************************************************/
function resetRetro()
{
  tib = '  ';
  image[2] = startLast;
  image[3] = startHeap;
}



function getMemUsage()
{
  document.forms[1].stats.value = 'Heap: ' + image[3] + '\n';
  document.forms[1].stats.value += 'Dictionary: ' + image[2] + '\n';
}
