<?php

class ElementDictionaryValueValidation implements ValidationInterface
{

    public function validate(array $data): array
    {
        $errors = [];

        if (!is_array($data)) {
            $errors[] = "payload is not an array";
        }

        return $errors;
    }
}
