<?php

class Database extends PDO
{
    public function __construct(private string $host,
                                private string $name,
                                private string $user,
                                private string $password)
    {}
        
    public function getConnection(): PDO | null
    {
        $dsn = "mysql:host={$this->host};dbname={$this->name};charset=utf8";
    
        try{
            return new PDO($dsn, $this->user, $this->password, [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_STRINGIFY_FETCHES => false
            ]);
        } catch (PDOException $exception){
            return null;
        }

    }
}









