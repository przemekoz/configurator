<?php

function parseBooleanResponse(array $data): array
{
    $newData = $data;
    $booleanFields = ["is_active", "multiple"];
    foreach ($booleanFields as $field) {
        if (isset($data[$field])) {
            $newData[$field] = (bool) $newData[$field];
        }
    }
    return $newData;
}