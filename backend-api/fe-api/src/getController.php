<?php

require __DIR__ . "/Base/MainController.php";
require __DIR__ . "/Element/ElementValidation.php";

function getController(string $url, $gateway): MainController
{

    $validation = null;
    $name = "__name__";

    switch ($url) {
        
        case Endpoints::Element->value:
            $name = Endpoints::Element->name;
            $validation = new ElementValidation();
            break;
        
        default:
            throw new ErrorException("Error: no matching Validation class");
    }

    return new BaseController($name, $gateway, $validation);
}
