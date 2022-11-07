<?php

class ClientGateway
{
    private PDO $conn;
    private $tableName = "client";

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $size = $output['size'];
        $offset = $output['page'] * $size;
        $orderBy = $output['sortField'];
        $orderDirection = $output['sortDir'];
        //$output['filter'];

        $sql = "SELECT * FROM {$this->tableName}   
            ORDER BY {$orderBy} {$orderDirection} 
            LIMIT {$offset}, {$size}";
        
        // var_dump($sql);
        $stmt = $this->conn->query($sql);


        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row["is_active"] = (bool) $row["is_active"];
            $data[] = $row;
        }

        $stmt = $this->conn->query("SELECT count(1) FROM {$this->tableName}");

        return ["data" => $data, "total" => $stmt->fetch(PDO::FETCH_DEFAULT)[0]];
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO {$this->tableName} (name, email, is_active, discount)
                VALUES (:name, :email, :is_active, :dicount)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindValue(":dicount", $data["discount"] ?? 0, PDO::PARAM_INT);
        $stmt->bindValue(":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL);

        $stmt->execute();

        return $this->conn->lastInsertId();
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
            $data["is_active"] = (bool) $data["is_active"];
        }

        return $data;
    }


    public function update(array $current, array $new): int
    {
        $sql = "UPDATE {$this->tableName}
                SET name = :name, discount = :discount, is_active = :is_active, email = :email
                WHERE id = :id";


        fileLog($new);

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $new["name"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $new["email"], PDO::PARAM_STR);
        $stmt->bindValue(":discount", $new["discount"] ?? 0, PDO::PARAM_INT);
        $stmt->bindValue(":is_active", (bool) ($new["is_active"] ?? false), PDO::PARAM_BOOL);

        $stmt->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(string $id): int
    {
        $sql = "DELETE FROM {$this->tableName}
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function deleteMany(): int
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $ids = explode(",", $output['ids']);

        $newparams = array();
        foreach ($ids as $n => $val){ $newparams[] = ":id_$n"; }

        $sql = "DELETE FROM {$this->tableName}
                WHERE id IN (" . implode(", ",$newparams). ")";

        $stmt = $this->conn->prepare($sql);
        
        foreach ($ids as $n => $val) {
            $stmt->bindValue(":id_$n", $val, PDO::PARAM_INT);
        }    

        $stmt->execute();

        return $stmt->rowCount();

    }
}
