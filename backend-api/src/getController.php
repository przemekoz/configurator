<?php

require __DIR__ . "/Base/BaseController.php";
require __DIR__ . "/Client/getClientValidationErrors.php";
require __DIR__ . "/Element/getElementValidationErrors.php";
require __DIR__ . "/Dictionary/getDictionaryValidationErrors.php";
require __DIR__ . "/DictionaryValue/getDictionaryValueValidationErrors.php";

function getController(string $url, $gateway): BaseController {
    
    $validationErrorsFoo = null;

    switch ($url) {
        case Endpoints::Clients:
            $validationErrorsFoo = getClientValidationErrors($gateway);

        case Endpoints::Elements:
            $validationErrorsFoo = getElementValidationErrors($gateway);
        
        default: 
            throw new ErrorException("Error: no matching getValidationErrors function");
    }

    return new BaseController($gateway, $validationErrorsFoo);
}






