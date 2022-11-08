<?php

declare(strict_types=1);

error_reporting(255);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE); 

ini_set('log_errors', TRUE);
ini_set('error_log', __DIR__ . '/logs/php-errors.log');

require __DIR__ . "/src/fileLog.php";
require __DIR__ . "/src/endpoints.php";
require __DIR__ . "/src/getController.php";
require __DIR__ . "/src/getGateway.php";

require __DIR__ . "/src/ErrorHandler.php";
require __DIR__ . "/src/Database.php";

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, OPTIONS");

$parts = explode("/", $_SERVER["REQUEST_URI"]);

$endpoints = [Endpoints::Clients, Endpoints::Elements, Endpoints::Dictionaries, Endpoints::DictionariesValue];

$url = explode("?", $parts[1]);

if (!in_array($url[0], $endpoints)) {
    http_response_code(404);
    exit;
}

$id = $parts[2] ?? null;

$database = new Database("localhost", "configurator_db", "root", "");

try {
    $gateway = getGateway($url[0], $database);
    $controller = getController($url[0], $gateway);
    $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
} catch(Exception $e) {
    error_log("Caught exception: {$e->getMessage()}");
}
