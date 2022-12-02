<?php

class ClientGateway extends BaseGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
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
        return [
            [":name", $data["name"], PDO::PARAM_STR],
            [":email", $data["email"], PDO::PARAM_STR],
            [":discount", $data["discount"] ?? 0, PDO::PARAM_INT],
            [":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL]
        ];
    }
}
