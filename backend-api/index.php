<?php

declare(strict_types=1);

error_reporting(255);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE); 

ini_set('log_errors', TRUE);
ini_set('error_log', __DIR__ . '/logs/php-errors.log');

require __DIR__ . "/src/fileLog.php";

require __DIR__ . "/src/Base/BaseGateway.php";

require __DIR__ . "/src/Client/ClientController.php";
require __DIR__ . "/src/Client/ClientGateway.php";
require __DIR__ . "/src/ErrorHandler.php";
require __DIR__ . "/src/Database.php";

// require __DIR__ . "/src/Element/ElementController.-php";
require __DIR__ . "/src/Element/ElementGateway.php";

// require __DIR__ . "/src/Dictionary/DictionaryController.php";
require __DIR__ . "/src/Dictionary/DictionaryGateway.php";

// require __DIR__ . "/src/DictionaryValue/DictionaryValueController.php";
// require __DIR__ . "/src/DictionaryValue/DictionaryValueGateway.php";

// spl_autoload_register(function ($class) {
//     require __DIR__ . "/src/$class.php";
// });

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, OPTIONS");

$parts = explode("/", $_SERVER["REQUEST_URI"]);

$endpoints = array("clients", "elements", "dictionaries", "dictionaries_value");

$url = explode("?", $parts[1]);

if (!in_array($url[0], $endpoints)) {
    http_response_code(404);
    exit;
}

$id = $parts[2] ?? null;


$database = new Database("localhost", "configurator_db", "root", "");

$clientGateway = new ClientGateway($database);
$clientController = new ClientController($clientGateway);
$clientController->processRequest($_SERVER["REQUEST_METHOD"], $id);













