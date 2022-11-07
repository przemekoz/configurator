<?php

declare(strict_types=1);

error_reporting(0);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE); 

ini_set('log_errors', TRUE);
ini_set('error_log', 'logs/php-errors.log');

require __DIR__ . "/src/fileLog.php";
spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

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

$gateway = new ClientGateway($database);

$controller = new ClientController($gateway);

fileLog($_SERVER["REQUEST_METHOD"]);

$controller->processRequest($_SERVER["REQUEST_METHOD"], $id);













