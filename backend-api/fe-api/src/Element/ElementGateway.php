<?php

class ElementGateway extends MainGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("element");
    }

    public function getAll(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        // $filterString = "type:type_1_amp_material:material_1,material_2";
        $filterString = $output["filter"];
        list($orderBy, $orderDirection) = explode(",", $output["order"]);

        $filters = explode("_amp_", $filterString);

        foreach ($filters as $item) {
            list($filterName, $filterValues) = explode(":", $item);
        }

        fileLog($filters);

        $whereA = [];
        foreach ($filters as $key => $value) {
            array_push($whereA, "d.code = :{$key}");
            array_push($whereA, "dv.code = :{$key}_value");
        }

        $where = implode(" AND ", $whereA);

        $from = "FROM {$this->tableName} e
            INNER JOIN element_dictionary_value edv ON (edv.element_id = e.id)
            INNER JOIN dictionary_value dv ON (edv.dictionary_value_id = dv.id)
            INNER JOIN dictionary d ON (dv.dictionary_id = d.id)";

        $sql = "SELECT e.name, e.image, e.thumbnail {$from} WHERE {$where}";

        fileLog($sql);

        $stmt = $this->conn->prepare($sql);

        foreach ($filters as $key => $value) {
            $stmt->bindValue(":{$key}", $key, PDO::PARAM_STR);
            $stmt->bindValue(":{$key}_value", $value, PDO::PARAM_STR);
        }

        $stmt->execute();

        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = parseBooleanResponse($row);
        }

        // $stmt = $this->conn->prepare("SELECT count(1) FROM {$from} WHERE {$where}");
        // $stmt->execute();

        // return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
        return ["data" => $data, "total" => -1];
    }

    public function get(string $id): array | false
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data !== false) {
            $data = parseBooleanResponse($data);
        }

        return $data;
    }
}
