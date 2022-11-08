<?php

class ElementGateway extends BaseGateway
{
    public function __construct(Database $database)
    {
        parent::__construct($database);
        parent::setTableName("element");
    }

    public function create(array $data): string
    {
        $params = $this->prepareQuery($data);
        return parent::createQuery("(name, is_active)", "(:name, :is_active)", $params, $data);
    }

    public function update(array $current, array $new): int
    {
        $params = $this->prepareQuery($new);
        return parent::updateQuery("name = :name, is_active = :is_active", $params, $current, $new);
    }

    private function prepareQuery($data): array
    {
        return [
            [":name", $data["name"], PDO::PARAM_STR],
            [":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL]
        ];
    }
}
