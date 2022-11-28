<?php

class DictionaryValueGateway extends BaseOneToManyGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("dictionary_value");
    }

    public function create(array $data, string $dictionary_id): int
    {
        foreach ($data as $item) {
            list("name" => $name, "id" => $id, "order" => $sort, "to_delete" => $to_delete) = $item;

            if ($id) {
                if ($to_delete)
                    $this->delete($id);
                else
                    $this->update($id, $name, $sort);
            } else {
                if (!$to_delete)
                    $this->insert($name, $sort, $dictionary_id);
            }
        }
        return 1;
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
            $data[] = parseBooleanResponse($row);
        }

        return ["data" => $data, "total" => count($data)];
    }

    private function delete(string $id): int
    {
        $sql = "DELETE FROM {$this->tableName} WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->rowCount();
    }

    private function update(string $id, string $name, int $sort): int
    {
        $sql = "UPDATE {$this->tableName} SET name = :name, sort = :sort WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->bindValue(":name", $name, PDO::PARAM_STR);
        $stmt->bindValue(":sort", $sort, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->rowCount();
    }

    private function insert(string $name, int $sort, string $dictionary_id): int
    {
        $sql = "INSERT INTO {$this->tableName} (dictionary_id, name, sort) VALUES (:dictionary_id, :name, :sort)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":dictionary_id", $dictionary_id, PDO::PARAM_INT);
        $stmt->bindValue(":name", $name, PDO::PARAM_STR);
        $stmt->bindValue(":sort", $sort, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->rowCount();
    }
}
