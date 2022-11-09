<?php

class DictionaryValueValidation implements ValidationInterface {
    
    public function validate(array $data): array {
        $errors = [];

        if (empty($data["name"])) {
            $errors[] = "name is required";
        }
        
        return $errors;
    } 
}
