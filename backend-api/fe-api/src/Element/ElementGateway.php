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
        $filters = $output["filter"];
        // $size = $output['size'];
        // $offset = $output['page'] * $size;
        // $orderBy = $output['sortField'];
        // $orderDirection = $output['sortDir'];
        //$output['filter'];

        // $filters = [
        //     "name" => "pupcia1",
        //     "type" => "type1",
        //     ];

        fileLog("ZUPA");

        $whereA = [];
        foreach ($filters as $key => $value) {
            array_push($whereA, "`d.{$key}`" . " = :" . $key);
        }

        $where = implode(" AND ", $whereA);

        $from = "FROM {$this->tableName} e
            INNER JOIN element_dictionary_value edv ON (edv.element_id = e.id)
            INNER JOIN dictionary_value dv ON (edv.dictionary_value_id = dv.id)
            INNER JOIN dictionary d ON (dv.dictionary_id = d.id)";

        $sql = "SELECT * {$from} WHERE {$where}";

        $stmt = $this->conn->prepare($sql);

        foreach ($filters as $key => $value) {
            $stmt->bindValue(":{$key}", $value, PDO::PARAM_STR);
        }

        $stmt->execute();

        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = parseBooleanResponse($row);
        }

        $stmt = $this->conn->query("SELECT count(1) FROM {$from} WHERE {$where}");

        return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
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
