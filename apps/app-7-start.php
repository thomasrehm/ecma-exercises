<?php

// Wichtig! Codierung UTF-8 ohne BOM einstellen!!!
if (isset($_GET['show_php'])) {
    die(highlight_file(__FILE__, 1));
}

ini_set('default_charset', 'utf-8'); // ... wird dies gebrauch, wenn UTF-8 ohne BOM einstellt ist?

//ini_set('display_errors',0); error_reporting(0);              // nach allen Tests aktivieren
ini_set('display_errors', 1); error_reporting(E_ALL | E_STRICT); // nach allen Tests deaktivieren


// Begrenzungen für Server-Sicherheit:
define('FILE_BOM_ZEICHEN', "\xef\xbb\xbf");  // UTF-8-BOM für Daten-File
define('FILE_SIZE_MAX',    200000);          // Sicherheit: max-Dateigröße in Byte für Daten-File
define('FILE_CMOD',          0600);          // Sicherheit: cmod für Daten-File
define('MAX_ANZ_FILES_IN_DIR', 99);          // Sicherheit: begrenze die Anzahl der Dateien von __dir__

$file_name_append = basename(__FILE__, '.php').'-'; // file ohne Extension
$file_read_name = basename(__FILE__, '.php').'-'; // file ohne Extension


// Sichere unbenutzte Globals ( verwende lediglich $_POST )
$_COOKIE = array();
$_GET = array();
$_REQUEST = array();
$_SESSIONT = array();
$_FILES = array();

// Web-System:
function get_php_web_url()
{
    $temp = 'http'.(isset($_SERVER['HTTPS']) ? 's' : '').'://';

    return "$temp{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
}

function get_php_web_dir_name()
{
    return dirname(get_php_web_url());
}

// File-System:
function get_php_file_name()
{
    return __FILE__;
}
function get_php_file_name_ohne_ext()
{
    return basename(__FILE__, '.php');
}
function get_php_file_dir()
{
    return __DIR__;
}

function get_anz_files_in_dir()
{
    return count($files = scandir(__DIR__));
}
function get_file_names_in_dir()
{
    $s = '';
    $files = array_map('htmlspecialchars', scandir(__DIR__));
    foreach ($files as $file) {
        if (!is_dir($file) and $file != '.' and $file != '..') {
            $s .= sprintf('%s %s %s '.PHP_EOL, $file, filesize($file), substr(decoct(fileperms($file)), -4));
        }
    }

    return $s;
}

// ******************* BEGINN DER TESTS ***********************
// Bei PHP-Problemen mit Unicode-Strings kann ggf. helfen:
 function bin_to_utf8($str)
 {
     if (!mb_check_encoding($str, 'UTF-8')
   || !($str === mb_convert_encoding(mb_convert_encoding($str, 'UTF-32', 'UTF-8'), 'UTF-8', 'UTF-32'))) {
         $str = mb_convert_encoding($str, 'UTF-8');
     }

     return $str;
 }

// nur zum Teste von PHP ...
// Einige mögliche Ausgabe-Tests, wie out1(); out2(); ...
// einzeln: function out22() { $s = phpInfo(); echo htmlentities($s,ENT_NOQUOTES);}// zeigt u.a. Installationsinfos an
// einzeln: function out33() { $s = var_dump(get_defined_functions()); echo htmlentities($s,ENT_NOQUOTES);} // zeigt u.a. die verfügbaren Funktionsnamen an

function out1()
{ // zeige einen Unicode-String clientseitig an
  $utf8_str = "\n\nout1() vom Server\nABC\näöü\nÄÖÜß\n➊➋➌";
    echo $utf8_str;
}

function out2()
{ // Selbstauskunft von PHP über diese PHP-Datei, dieses aktuelle Dir
$s = "\n\nout2() vom Server\nKONSTANTEN";
    $s .= "\nFILE_SIZE_MAX               =".FILE_SIZE_MAX;
    $s .= "\nFILE_CMOD                   =".FILE_CMOD;
    $s .= "\nMAX_ANZ_FILES_IN_DIR        =".MAX_ANZ_FILES_IN_DIR;

    $s .= "\n\nWEB-INFOS";
    $s .= "\nget_php_web_url()           =".get_php_web_url();
    $s .= "\nget_php_web_dir_name()      =".get_php_web_dir_name();

    $s .= "\n\nSERVER-INFOS";
    $s .= "\nget_php_file_dir()          =".get_php_file_dir();
    $s .= "\nget_anz_files_in_dir()      =".get_anz_files_in_dir();
    $s .= "\nget_php_file_name()         =".get_php_file_name();
    $s .= "\nget_php_file_name_ohne_ext()=".get_php_file_name_ohne_ext();
    echo $s;
}

function out3()
{ // gib base64_str-String zurück, bei PHP UTF-8 macht base64_decode() Propleme ...
if (isset($_POST['GESENDET_VON_CLIENT'])) {
    $gesendet_von_client = "\n\nout3() vom Server\n".$_POST['GESENDET_VON_CLIENT'];
    echo $gesendet_von_client;
}
}

function out4()
{ // ????????? gewünscht ist:  utf8_decode(base64_decode(...)) sollte funktionieren
// VIELE FEHLVERSUCHE: ... // siehe auch https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
// Kann ggf. notwendig werden ...
// header("content-type: text/html; charset=UTF-8");
// ini_set('mbstring.internal_encoding','UTF-8');
// mb_internal_encoding('UTF-8');
// mb_http_input('UTF-8');
// mb_http_output('UTF-8');
// Installationsabhängig kann erforderlich sein: $_POST = array_map( 'stripslashes', $_POST );
// ggf. kann erforderlich sein:  bin_to_utf8($_POST['GESENDET_VON_CLIENT']);
// $base64_str = base64_encode(utf8_encode($utf8_str));
// $utf8_str = utf8_decode(base64_decode($base64_str));
// $utf8_str = "\n\nout4() vom Server\n".base64_decode( $_POST['GESENDET_VON_CLIENT'] );
// echo "\n\nout4() vom Server\n".bin_to_utf8(base64_decode('JTI1MDElMjUwMiUyNTAzJTI1MDQlMjUwNSUyNTA2JTI1MDclMjUwOCUyNTA5JTI1MEElMjUwQyUyNTBBJTI1MEUlMjUwRiUyNTEwJTI1MTElMjUxMiUyNTEzJTI1MTQlMjUxNSUyNTE2JTI1MTclMjUxOCUyNTE5JTI1MUElMjUxQiUyNTFDJTI1MUQlMjUxRSUyNTFGJTI1MjAhJTI1MjIlMjUyMyUyNTI0JTI1MjUlMjUyNicoKSolMjUyQiUyNTJDLS4lMjUyRjAxMjM0NTY3ODklMjUzQSUyNTNCJTI1M0MlMjUzRCUyNTNFJTI1M0YlMjU0MEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJTI1NUIlMjU1QyUyNTVEJTI1NUVfJTI1NjBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eiUyNTdCJTI1N0MlMjU3RH4lMjU3RiUyNUMyJTI1ODAlMjVDMiUyNTgxJTI1QzIlMjU4MiUyNUMyJTI1ODMlMjVDMiUyNTg0JTI1MEElMjVDMiUyNTg2JTI1QzIlMjU4NyUyNUMyJTI1ODglMjVDMiUyNTg5JTI1QzIlMjU4QSUyNUMyJTI1OEIlMjVDMiUyNThDJTI1QzIlMjU4RCUyNUMyJTI1OEUlMjVDMiUyNThGJTI1QzIlMjU5MCUyNUMyJTI1OTElMjVDMiUyNTkyJTI1QzIlMjU5MyUyNUMyJTI1OTQlMjVDMiUyNTk1JTI1QzIlMjU5NiUyNUMyJTI1OTclMjVDMiUyNTk4JTI1QzIlMjU5OSUyNUMyJTI1OUElMjVDMiUyNTlCJTI1QzIlMjU5QyUyNUMyJTI1OUQlMjVDMiUyNTlFJTI1QzIlMjU5RiUyNUMyJTI1QTAlMjVDMiUyNUExJTI1QzIlMjVBMiUyNUMyJTI1QTMlMjVDMiUyNUE0JTI1QzIlMjVBNSUyNUMyJTI1QTYlMjVDMiUyNUE3JTI1QzIlMjVBOCUyNUMyJTI1QTklMjVDMiUyNUFBJTI1QzIlMjVBQiUyNUMyJTI1QUMlMjVDMiUyNUFEJTI1QzIlMjVBRSUyNUMyJTI1QUYlMjVDMiUyNUIwJTI1QzIlMjVCMSUyNUMyJTI1QjIlMjVDMiUyNUIzJTI1QzIlMjVCNCUyNUMyJTI1QjUlMjVDMiUyNUI2JTI1QzIlMjVCNyUyNUMyJTI1QjglMjVDMiUyNUI5JTI1QzIlMjVCQSUyNUMyJTI1QkIlMjVDMiUyNUJDJTI1QzIlMjVCRCUyNUMyJTI1QkUlMjVDMiUyNUJGJTI1QzMlMjU4MCUyNUMzJTI1ODElMjVDMyUyNTgyJTI1QzMlMjU4MyUyNUMzJTI1ODQlMjVDMyUyNTg1JTI1QzMlMjU4NiUyNUMzJTI1ODclMjVDMyUyNTg4JTI1QzMlMjU4OSUyNUMzJTI1OEElMjVDMyUyNThCJTI1QzMlMjU4QyUyNUMzJTI1OEQlMjVDMyUyNThFJTI1QzMlMjU4RiUyNUMzJTI1OTAlMjVDMyUyNTkxJTI1QzMlMjU5MiUyNUMzJTI1OTMlMjVDMyUyNTk0JTI1QzMlMjU5NSUyNUMzJTI1OTYlMjVDMyUyNTk3JTI1QzMlMjU5OCUyNUMzJTI1OTklMjVDMyUyNTlBJTI1QzMlMjU5QiUyNUMzJTI1OUMlMjVDMyUyNTlEJTI1QzMlMjU5RSUyNUMzJTI1OUYlMjVDMyUyNUEwJTI1QzMlMjVBMSUyNUMzJTI1QTIlMjVDMyUyNUEzJTI1QzMlMjVBNCUyNUMzJTI1QTUlMjVDMyUyNUE2JTI1QzMlMjVBNyUyNUMzJTI1QTglMjVDMyUyNUE5JTI1QzMlMjVBQSUyNUMzJTI1QUIlMjVDMyUyNUFDJTI1QzMlMjVBRCUyNUMzJTI1QUUlMjVDMyUyNUFGJTI1QzMlMjVCMCUyNUMzJTI1QjElMjVDMyUyNUIyJTI1QzMlMjVCMyUyNUMzJTI1QjQlMjVDMyUyNUI1JTI1QzMlMjVCNiUyNUMzJTI1QjclMjVDMyUyNUI4JTI1QzMlMjVCOSUyNUMzJTI1QkElMjVDMyUyNUJCJTI1QzMlMjVCQyUyNUMzJTI1QkQlMjVDMyUyNUJFJTI1QzMlMjVCRg=='));
                            // liefert  %2501%2502%2503...
// $utf8_str = "\n\nout4() vom Server\n".bin_to_utf8(base64_decode( $_POST['GESENDET_VON_CLIENT'] ));
// $utf8_str = "\n\nout4() vom Server\n".imap_base64( trim($_POST['GESENDET_VON_CLIENT']) );
// $utf8_str = "\n\nout4() vom Server\n".imap_utf8( base64_decode( $_POST['GESENDET_VON_CLIENT'] ));
// $utf8_str = "\n\nout4() vom Server\n".hexhex_to_byte( $_POST['GESENDET_VON_CLIENT'] );
// $utf8_str = hex2bin( $_POST['GESENDET_VON_CLIENT'] ); // gibt es nicht bei PHP 5
//??? var_dump($arr);

  if (isset($_POST['GESENDET_VON_CLIENT'])) { // PHP base64_decode() liefert viele %..., deshalb hex
   $utf8_str = "\n\nout4() vom Server\n".pack('H*', $_POST['GESENDET_VON_CLIENT']);
      echo $utf8_str;
  }
}

function out5()
{ // gib $utf8_str-String zurück
  if (isset($_POST['GESENDET_VON_CLIENT'])) {
      $JSONstr = pack('H*', $_POST['GESENDET_VON_CLIENT']);
      echo "\n\nout5() vom Server\n".$JSONstr;
  }
}

function out6()
{ // gib $utf8_str-String zurück
  if (isset($_POST['GESENDET_VON_CLIENT'])) {
      $JSONstr = pack('H*', $_POST['GESENDET_VON_CLIENT']);
      $arr = json_decode($JSONstr, true); // arr-Schreibweise
    // =====
    // ERROR print_r funktioniert nicht als String?
    // =====
    echo "\n\nout5() vom Server\n<pre>".print_r($arr, true).'</pre>';
  }
}
// Teste
// out1(); out2();out3();out4();out5();out6(); exit;
// out2();
// ******************* ENDE DER TESTS ***********************

$hex_str_vom_client = $_POST['GESENDET_VON_CLIENT'];
$JSONstr = pack('H*', $hex_str_vom_client);
$arr = json_decode($JSONstr, true);

//===============================================
// TODO:
// *** Hier fehlt die Passwort-Prüfung
//     mit $arr['pw1'] gegen die white-List
//===============================================

if (strlen($arr['action']) < 5 || $arr['action'] !== get_php_web_url()) { /*header("Location: $err_htm");*/ exit;
}
if (strlen($arr['htm_web_dir']) < 5 || $arr['htm_web_dir'] !==  get_php_web_dir_name()) { /*header("Location: $err_htm");*/ exit;
}

$file_name_append .= $arr['append_file_name'];  // echo $file_name_append;
$file_read_name .= $arr['append_file_name'];  // echo $file_read_name;


//===============================================
// TODO: Schreiben und Lesen trennen, wie z.B.
// if( $client_wuenscht_zu_schreiben ) { ...
$file_append_str = "\n***\n".$arr['ta0']; // *** Speichere den String von ta0 als "append" im File
if (@file_exists($file_name_append)) {
    $f_size = @filesize($file_name_append);
} else {
    $f_size = 0;
}
if ($f_size + strlen($file_append_str) > FILE_SIZE_MAX) {
    exit;
}
if ($f_size == 0) {
    $file_append_str = FILE_BOM_ZEICHEN.$file_append_str;
}
if (@file_put_contents($file_name_append, $file_append_str, FILE_APPEND) === false) {
    @chmod(__FILE__, $cmod);
    exit;
}
@chmod(__FILE__, 0660);
@chmod($file_name_append, 0660);
clearstatcache();
exit;
// }
//===============================================
// TODO:
// if( $client_wünscht_zu_lesen ) { ...
//
// }

exit;
