<?php

class ClientGateway extends BaseGateway
{
    // private PDO $conn;
    // protected $tableName = "client";

    // public function __construct(Database $database)
    // {
    //     $this->conn = $database->getConnection();
    // }

    // public function getAll(): array
    // {
    //     parse_str($_SERVER["QUERY_STRING"], $output);
    //     $size = $output['size'];
    //     $offset = $output['page'] * $size;
    //     $orderBy = $output['sortField'];
    //     $orderDirection = $output['sortDir'];
    //     //$output['filter'];

    //     $sql = "SELECT * FROM {$this->tableName}   
    //         ORDER BY {$orderBy} {$orderDirection} 
    //         LIMIT {$offset}, {$size}";

    //     $stmt = $this->conn->query($sql);

    //     $data = [];
    //     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //         $row["is_active"] = (bool) $row["is_active"];
    //         $data[] = $row;
    //     }

    //     $stmt = $this->conn->query("SELECT count(1) FROM {$this->tableName}");

    //     return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
    // }
    
    // public function get(string $id): array | false
    // {
    //     $sql = "SELECT *
    //             FROM {$this->tableName}
    //             WHERE id = :id";

    //     $stmt = $this->conn->prepare($sql);

    //     $stmt->bindValue(":id", $id, PDO::PARAM_INT);

    //     $stmt->execute();

    //     $data = $stmt->fetch(PDO::FETCH_ASSOC);

    //     if ($data !== false) {
    //         $data["is_active"] = (bool) $data["is_active"];
    //     }

    //     return $data;
    // }


    public function __construct(Database $database)
    {
        parent::__construct($database);
        parent::setTableName("client");
    }

    public function create(array $data): string
    {
        $params = $this->prepareQuery($data);
        return parent::createQuery("(name, email, is_active, discount)", "(:name, :email, :is_active, :discount)", $params, $data);
    }

    public function update(array $current, array $new): int
    {
        $params = $this->prepareQuery($new);
        return parent::updateQuery("name = :name, discount = :discount, is_active = :is_active, email = :email", $params, $current, $new);
    }

    private function prepareQuery($data): array
    {
        return array(
            [":name", $data["name"], PDO::PARAM_STR],
            [":email", $data["email"], PDO::PARAM_STR],
            [":discount", $data["discount"] ?? 0, PDO::PARAM_INT],
            [":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL]
        );
    }
}
