<?
$data = $_POST['tib'];
$file = "motu.txt";

$fp = fopen($file, "w") or die("Couldn't open $file for writing!");
fwrite($fp, $data) or die("Couldn't write values to file!");

fclose($fp);
?>
