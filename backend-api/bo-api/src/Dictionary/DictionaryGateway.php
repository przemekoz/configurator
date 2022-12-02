<?php

class DictionaryGateway extends BaseGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("dictionary");
    }

    public function getAll(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $size = $output['size'];
        $offset = $output['page'] * $size;
        $orderBy = $output['sortField'];
        $orderDirection = $output['sortDir'];
        //$output['filter'];

        $sql = "SELECT *, 
            (select GROUP_CONCAT(name SEPARATOR ', ') from dictionary_value where dictionary_id=d.id) as `values` 
            FROM {$this->tableName} d   
            ORDER BY {$orderBy} {$orderDirection} 
            LIMIT {$offset}, {$size}";

        $stmt = $this->conn->query($sql);

        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = parseBooleanResponse($row);
        }

        $stmt = $this->conn->query("SELECT count(1) FROM {$this->tableName}");

        return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
    }

    public function create(array $data): string
    {
        $params = $this->prepareQuery($data);
        return parent::createQuery("(name, is_active, multiple)", "(:name, :is_active, :multiple)", $params, $data);
    }

    public function update(array $current, array $new): int
    {
        $params = $this->prepareQuery($new);
        return parent::updateQuery("name = :name, is_active = :is_active, multiple = :multiple", $params, $current, $new);
    }

    public function getMaxId(): int
    {
        $stmt = $this->conn->query("SELECT max(id) FROM {$this->tableName}");
        $data = $stmt->fetch();
        return $data[0];
    }

    private function prepareQuery($data): array
    {
        return [
            [":name", $data["name"], PDO::PARAM_STR],
            [":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL],
            [":multiple", (bool) ($data["multiple"] ?? false), PDO::PARAM_BOOL]
        ];
    }
}
