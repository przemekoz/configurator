<?php

require __DIR__ . "/Base/MainController.php";
require __DIR__ . "/Base/BaseController.php";
require __DIR__ . "/Base/BaseOneToManyController.php";
require __DIR__ . "/Base/ValidationInterface.php";
require __DIR__ . "/Client/ClientValidation.php";
require __DIR__ . "/Element/ElementValidation.php";
require __DIR__ . "/Dictionary/DictionaryValidation.php";
require __DIR__ . "/DictionaryValue/DictionaryValueValidation.php";
require __DIR__ . "/ElementDictionaryValue/ElementDictionaryValueValidation.php";

function getController(string $url, $gateway): MainController {
    
    $validation = null;
    $name = "__name__";

    switch ($url) {
        case Endpoints::Client->value:
            $name = Endpoints::Client->name;
            $validation = new ClientValidation();
            break;
            
        case Endpoints::Element->value:
            $name = Endpoints::Element->name;
            $validation = new ElementValidation();
            break;
            
        case Endpoints::Dictionary->value:
            $name = Endpoints::Dictionary->name;
            $validation = new DictionaryValidation();
            break;
                
        case Endpoints::DictionaryValue->value:
            $name = Endpoints::DictionaryValue->name;
            $validation = new DictionaryValueValidation();
            return new BaseOneToManyController($name, $gateway, $validation);
            break;

        case Endpoints::ElementDictionaryValue->value:
            $name = Endpoints::ElementDictionaryValue->name;
            $validation = new ElementDictionaryValue();
            break;    

        default: 
            throw new ErrorException("Error: no matching Validation class");
    }

    return new BaseController($name, $gateway, $validation);
}
