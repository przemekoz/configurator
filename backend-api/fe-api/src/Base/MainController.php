<?php

class MainController
{
    public function __construct(
        protected string $name,
        protected MainGateway $gateway
    ) {
    }

    public function processRequest(string $method, string $id): void
    {
    }
}
