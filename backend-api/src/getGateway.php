<?php

require __DIR__ . "/Base/BaseGateway.php";
require __DIR__ . "/Client/ClientGateway.php";
require __DIR__ . "/Element/ElementGateway.php";
require __DIR__ . "/Dictionary/DictionaryGateway.php";
require __DIR__ . "/DictionaryValue/DictionaryValueGateway.php";

function getGateway(string $url, $connection): BaseGateway {
    switch ($url) {
        case Endpoints::Client->value :
            return new ClientGateway($connection);

        case Endpoints::Element->value:
            return new ElementGateway($connection);

        case Endpoints::Dictionary->value:
            return new DictionaryGateway($connection);

        case Endpoints::DictionaryValue->value:
            return new DictionaryValueGateway($connection);
            
        default: 
            throw new ErrorException("Error: no matching Gateway object");
             
    }
}
