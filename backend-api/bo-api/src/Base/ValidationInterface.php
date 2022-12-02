<?php

interface ValidationInterface {
    public function validate(array $data): array;
}