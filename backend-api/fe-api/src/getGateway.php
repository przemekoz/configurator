<?php

require __DIR__ . "/Base/MainGateway.php";
require __DIR__ . "/Element/ElementGateway.php";
require __DIR__ . "/Filter/FilterGateway.php";

function getGateway(string $url, $connection): MainGateway
{
    switch ($url) {
        case Endpoints::Element->value:
            return new ElementGateway($connection);

        case Endpoints::Filter->value:
            return new FilterGateway($connection);

        default:
            throw new ErrorException("Error: no matching Gateway object");
    }
}
