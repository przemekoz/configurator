<?php

class BaseOneToManyGateway extends MainGateway
{
    public function getAll(string $id): array | false
    {    
        return false;
    }

    public function create(array $data, string $id): int
    {    
        return 0;
    }
}
