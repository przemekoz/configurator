<?php

class BaseGateway
{
    protected PDO $conn;
    protected $tableName = "__table_name__";

    public function __construct(PDO $connection)
    {
        $this->conn = $connection;
    }

    protected function setTableName(string $tableName): void
    {
        $this->tableName = $tableName;
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

        $stmt = $this->conn->query($sql);

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
    
    public function get(string $id): array | false
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data !== false && isset($data["is_active"])) {
            $data["is_active"] = (bool) $data["is_active"];
        }

        return $data;
    }

    public function createQuery(string $fields, string $placeholders, array $params, array $data): string
    {
        $sql = "INSERT INTO {$this->tableName} {$fields} VALUES {$placeholders}";

        $stmt = $this->conn->prepare($sql);

        $this->prepareQuery($stmt, $params);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function updateQuery(string $fields, array $params, array $current, array $new): int
    {
        $sql = "UPDATE {$this->tableName}
                SET {$fields}
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $this->prepareQuery($stmt, $params);

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

        $newParams = array();
        foreach ($ids as $n => $val){ $newParams[] = ":id_$n"; }

        $sql = "DELETE FROM {$this->tableName}
                WHERE id IN (" . implode(", ",$newParams). ")";

        $stmt = $this->conn->prepare($sql);
        
        foreach ($ids as $n => $val) {
            $stmt->bindValue(":id_$n", $val, PDO::PARAM_INT);
        }    

        $stmt->execute();

        return $stmt->rowCount();

    }

    private function prepareQuery($stmt, $params) : void 
    {
        fileLog($params);
        foreach ($params as $param) {
            // $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
            fileLog($param);
            $stmt->bindValue($param[0], $param[1], $param[2]);
        }
    }
}
