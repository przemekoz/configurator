<?php

class MainGateway
{
    protected PDO $conn;
    protected $tableName = "__table_name__";

    public function __construct(PDO $connection)
    {
        $this->conn = $connection;
    }

    public function getDynamicMethod(string $nameOfMethod)
    {
        if (is_callable([$this, $nameOfMethod])) {
            return $this->$nameOfMethod();
        } else {
            throw new ErrorException("Error: no matching dynamic method for: {$nameOfMethod}");
        }
    }

    protected function setTableName(string $tableName): void
    {
        $this->tableName = $tableName;
    }
}
