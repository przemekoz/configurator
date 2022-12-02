<?php

require __DIR__ . "/Base/MainController.php";
require __DIR__ . "/Base/BaseController.php";

function getController(string $url, $gateway): MainController
{
    $name = "__name__";

    switch ($url) {

        case Endpoints::Element->value:
            $name = Endpoints::Element->name;
            break;

        default:
            throw new ErrorException("Error: no matching Validation class");
    }

    return new BaseController($name, $gateway);
}
