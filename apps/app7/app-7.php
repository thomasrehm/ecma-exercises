<?php
// Wichtig! Codierung UTF-8 ohne BOM einstellen!!!
if (isset($_GET['show_php'])) {
    die(highlight_file(__FILE__, 1));
}

//for development only
ini_set('display_errors', 'On');
//for development only
error_reporting(E_ALL | E_STRICT);

header("access-control-allow-origin: *");
ini_set('default_charset', 'utf-8');
date_default_timezone_set('Europe/Berlin');

// Begrenzungen für Server-Sicherheit:
define('FILE_BOM_ZEICHEN', "\xef\xbb\xbf");  // UTF-8-BOM für Daten-File
define('FILE_SIZE_MAX',    200000);          // Sicherheit: max-Dateigroessee in Byte fuer Daten-File
define('FILE_CMOD',          0660);          // Sicherheit: cmod für Daten-File
define('MAX_ANZ_FILES_IN_DIR', 99);          // Sicherheit: begrenze die Anzahl der Dateien von __dir__

//nicht verwendete, globale Variablen verbieten
$_COOKIE = array();
$_GET = array();
$_REQUEST = array();
$_SESSIONT = array();
$_FILES = array();

$file_name = basename(__FILE__, '.php').'-'; // file ohne Extension

function get_php_file_name()
{
    return __FILE__;
}

//inhalt des POST abfragen
$input_json = file_get_contents('php://input'); //($_POST doesn't work here)

// docodiere empfangenen String zu JSON
$response = json_decode($input_json, true);

$date = $response['date'];
$content = $response['content'];
$user = $response['user'];

// kommt eine leere Notiz beim Server an, soll hier angebrochen werden
if ($content == '') {
    exit;
}

//erzeuge eine UniqueID um die Bearbeitung von Eintraegen vorzubereiten
$uniqid = uniqid();

$note = array(
    'user' => $response['user'],
    'date' => $response['date'],
    'content' => $response['content'],
    'ID' => $uniqid
);

$file_content = false;

$file_name = '.notes_'.$user;

$file = __DIR__. '/' .$file_name;
if (!@file_exists($file)) {
    $myfile = @fopen($file, 'x+');
    // $file_content = ''.file_get_contents($file_name);
} else {
    $file_content = ''.@file_get_contents($file_name);
    $myfile = @fopen($file, 'w+');
}

if ($file_content != false) {
    // $notes = $file_content.','.$input_json;
    $notes = $file_content.','.json_encode($note);

} else {
    // $notes = $input_json;
    $notes = json_encode($note);
}


if (@file_exists($file_name)) {
    $f_size = @filesize($file_name);
} else {
    $f_size = 0;
}
if ($f_size + strlen($notes) > FILE_SIZE_MAX) {
    exit;
}

@fwrite($myfile, $notes);
@chmod($file_name, FILE_CMOD);
@fclose($myfile);


echo file_get_contents($file_name);
clearstatcache();

exit;
