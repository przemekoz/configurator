<?php
    
function getDictionaryValueValidationErrors(array $data): array
{
    $errors = [];

    if (empty($data["name"])) {
        $errors[] = "name is required";
    }
    
    return $errors;
}
