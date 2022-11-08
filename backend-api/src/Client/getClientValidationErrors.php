<?php
    
function getClientValidationErrors(array $data): array
{
    $errors = [];

    if (empty($data["name"])) {
        $errors[] = "name is required";
    }
    
    if (array_key_exists("discount", $data)) {
        if (filter_var($data["discount"], FILTER_VALIDATE_INT) === false) {
            $errors[] = "discount must be an integer";
        }
    }

    if (array_key_exists("email", $data)) {
        if (filter_var($data["email"], FILTER_VALIDATE_EMAIL) === false) {
            $errors[] = "email must be an email address";
        }
    }
    
    return $errors;
}
