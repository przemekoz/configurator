<?php

require __DIR__ . "/Base/BaseController.php";
require __DIR__ . "/Client/ClientValidation.php";
require __DIR__ . "/Element/getElementValidationErrors.php";
require __DIR__ . "/Dictionary/getDictionaryValidationErrors.php";
require __DIR__ . "/DictionaryValue/getDictionaryValueValidationErrors.php";

function getController(string $url, $gateway): BaseController {
    
    $validation = null;
    $name = "__name__";

    switch ($url) {
        case Endpoints::Clients->value:
            $name = Endpoints::Clients->name;
            $validation = new ClientValidation();
            break;

        case Endpoints::Elements->value:
            // $validation = getElementValidationErrors;
            break;

        default: 
            throw new ErrorException("Error: no matching Validation class");
    }

    return new BaseController($name, $gateway, $validation);
}






