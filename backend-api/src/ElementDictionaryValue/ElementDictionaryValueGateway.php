<?php

class ElementDictionaryValueGateway extends BaseOneToManyGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("element_dictionary_value");
    }

    public function getAllEntries(): array | false
    {
        [$element_id, $dictionary_id] = $this->getRequestParams();

        $sql = "SELECT dv.name as name, d.id as dictionary_id, dv.id as id
            FROM dictionary d
            INNER JOIN dictionary_value dv ON d.id = dv.dictionary_id
            INNER JOIN {$this->tableName} edv ON dv.id = edv.dictionary_value_id
            WHERE d.id = :id AND edv.element_id = :element_id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":element_id", $element_id, PDO::PARAM_INT);
        $stmt->bindValue(":id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return ["data" => $data, "total" => count($data)];
    }

    public function saveValues(): int
    {
        $data = (array) json_decode(file_get_contents("php://input"), true);

        [$element_id, $dictionary_id] = $this->getRequestParams();

        fileLog($data);
        fileLog($element_id);
        fileLog($dictionary_id);

        $this->delete($dictionary_id, $element_id);
        if (count($data)) {
            return $this->insert($data, $element_id);
        }
        return 0;
    }

    public function getAssignedDictionaryValues(): int
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $dictionary_value_id = $output["id"];

        $sql = "SELECT SUM(1)
            FROM {$this->tableName}
            WHERE dictionary_value_id = :dictionary_value_id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":dictionary_value_id", $dictionary_value_id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch();

        return $data[0] ?? 0;
    }

    public function getAssignedDictionaries(): int
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $dictionary_id = $output["id"];

        $sql = "SELECT SUM(1)
         FROM {$this->tableName} edv
         WHERE edv.dictionary_value_id IN (SELECT id FROM dictionary_value WHERE dictionary_id = :dictionary_id )";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":dictionary_id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch();

        return $data[0];
    }

    private function delete(int $dictionary_id, int $element_id): int
    {
        $sql = "DELETE FROM {$this->tableName}
                WHERE element_id = :element_id 
                AND dictionary_value_id IN (SELECT id FROM dictionary_value WHERE dictionary_id = :dictionary_id)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":element_id", $element_id, PDO::PARAM_INT);
        $stmt->bindValue(":dictionary_id", $dictionary_id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    private function insert(array $data, int $element_id): int
    {
        $placeholders = [];
        for ($i = 0; $i < count($data); $i++) {
            array_push($placeholders, "(:element_id_{$i}, :dictionary_value_id_{$i})");
        }

        $sql = "INSERT INTO {$this->tableName} (element_id, dictionary_value_id) VALUES " . implode(',', $placeholders);

        $stmt = $this->conn->prepare($sql);

        for ($i = 0; $i < count($data); $i++) {
            $stmt->bindValue(":element_id_$i", $element_id, PDO::PARAM_INT);
            $stmt->bindValue(":dictionary_value_id_$i", $data[$i], PDO::PARAM_INT);
        }

        $stmt->execute();

        return $stmt->rowCount();
    }

    private function getRequestParams(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        return [$output['element_id'], $output['dictionary_id']];
    }
}
