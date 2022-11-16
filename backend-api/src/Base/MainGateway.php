<?php

class MainGateway
{
    protected PDO $conn;
    protected $tableName = "__table_name__";

    public function __construct(PDO $connection)
    {
        $this->conn = $connection;
    }

    protected function setTableName(string $tableName): void
    {
        $this->tableName = $tableName;
    }
}
