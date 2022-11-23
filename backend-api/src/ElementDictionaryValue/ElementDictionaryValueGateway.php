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

    public function getAllValues(): array | false
    {
        [$element_id, $dictionary_id] = $this->getRequestParams();

        $sql = "SELECT dv.name as name
            FROM dictionary_value dv
            INNER JOIN {$this->tableName} edv ON dv.id = edv.dictionary_id;
            WHERE dictionary_value_id = :id AND element_id = :element_id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":element_id", $element_id, PDO::PARAM_INT);
        $stmt->bindValue(":dictionary_id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetchAll();

        return ["data" => $data, "total" => count($data)];
    }

    private function delete(string $dictionary_id): int
    {
        [$element_id, $dictionary_id] = $this->getRequestParams();

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
        [$element_id, $dictionary_id] = $this->getRequestParams();

        $placeholders = [];
        for ($i = 0; $i < count($data); $i++) {
            array_push($placeholders, "(:element_id_{$i}, :dictionary_id_{$i})");
        }

        $sql = "INSERT INTO {$this->tableName} (element_id, dictionary_id, dictionary_value_id) VALUES " . implode(',', $placeholders);

        $stmt = $this->conn->prepare($sql);

        for ($i = 0; $i < count($data); $i++) {
            $stmt->bindValue(":element_id_$i", $dictionary_id, PDO::PARAM_INT);
            $stmt->bindValue(":dictionary_id_$i", $dictionary_id, PDO::PARAM_INT);
            $stmt->bindValue(":dictionary_value_id_$i", $data[$i], PDO::PARAM_INT);
        }

        $stmt->execute();

        return $stmt->rowCount();
    }

    private function getRequestParams(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        return [$output['element_id'], $output['dictionary_id'], $output['dictionary_value_id']];
    }
}
