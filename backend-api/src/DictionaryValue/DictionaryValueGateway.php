<?php

class DictionaryValueGateway extends BaseOneToManyGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("dictionary_value");
    }

    public function create(array $data, string $id): string
    {
        $this->delete($id);
        $this->insert($data, $id);
        // $params = $this->prepareQuery($data);
        // return parent::createQuery("(name)", "(:name)", $params, $data);
    }

    public function getAll(string $id): array | false
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE dictionary_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (isset($row["is_active"])) {
                $row["is_active"] = (bool) $row["is_active"];
            } 
            $data[] = $row;
        }

        $stmt = $this->conn->query("SELECT count(1) FROM {$this->tableName}");

        return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
    }

    private function delete(string $dictionary_id): int 
    {
        $sql = "DELETE FROM {$this->tableName}
                    WHERE dictionary_id = :id";

        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    private function insert(array $data, string $dictionary_id): int 
    {

        fileLog($data);
        // $sql = "INSERT INTO {$this->tableName} {$fields} VALUES {$placeholders}";

        // $stmt = $this->conn->prepare($sql);

        // $this->prepareQuery($stmt, $params);

        // $stmt->execute();

        // return $this->conn->lastInsertId();
    }


    private function prepareQuery($data): array
    {
        return [
            [":name", $data["name"], PDO::PARAM_STR],
        ];
    }
}
