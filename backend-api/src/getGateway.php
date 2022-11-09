<?php

require __DIR__ . "/Base/BaseGateway.php";
require __DIR__ . "/Client/ClientGateway.php";
require __DIR__ . "/Element/ElementGateway.php";
require __DIR__ . "/Dictionary/DictionaryGateway.php";
require __DIR__ . "/DictionaryValue/DictionaryValueGateway.php";

function getGateway(string $url, $database): BaseGateway {
    switch ($url) {
        case Endpoints::Clients->value :
            return new ClientGateway($database);

        case Endpoints::Elements->value:
            return new ElementGateway($database);
            
        default: 
            throw new ErrorException("Error: no matching Gateway object");
             
    }
}
