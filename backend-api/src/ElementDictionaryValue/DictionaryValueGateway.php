<?php

class ElementDictionaryValueGateway extends BaseOneToManyGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("element_dictionary_value");
    }

    public function create(array $data, string $id): int
    {
        $this->delete($id);
        if (count($data)) {
            return $this->insert($data, $id);
        }
        return 0;
    }

    public function getAll(string $id): array | false
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE dictionary_id = :id AND element_id = :element_id";

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
                    WHERE element_id = :element_id 
                    AND dictionary_id = :dictionary_id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":element_id", $element_id, PDO::PARAM_INT);
        $stmt->bindValue(":dictionary_id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    private function insert(array $data, string $dictionary_id): int
    {
        $placeholders = [];
        for ($i = 0; $i < count($data); $i++) {
            array_push($placeholders, "(:element_id_{$i}, :dictionary_id_{$i})");
        }

        $sql = "INSERT INTO {$this->tableName} (element_id, dictionary_id) VALUES " . implode(',', $placeholders);

        $stmt = $this->conn->prepare($sql);

        for ($i = 0; $i < count($data); $i++) {
            $stmt->bindValue(":element_id_$i", $dictionary_id, PDO::PARAM_INT);
            $stmt->bindValue(":dictionary_id_$i", $dictionary_id, PDO::PARAM_INT);
        }

        $stmt->execute();

        return $stmt->rowCount();
    }
}
