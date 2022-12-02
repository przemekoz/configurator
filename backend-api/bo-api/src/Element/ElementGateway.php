<?php

class ElementGateway extends BaseGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("element");
    }

    public function create(array $data): string
    {
        $params = $this->prepareQuery($data);
        return parent::createQuery("(name, is_active, thumbnail, image)", "(:name, :is_active, :thumbnail, :image)", $params, $data);
    }

    public function update(array $current, array $new): int
    {
        $params = $this->prepareQuery($new);
        return parent::updateQuery("name = :name, is_active = :is_active, thumbnail = :thumbnail, image = :image", $params, $current, $new);
    }

    private function prepareQuery($data): array
    {
        return [
            [":name", $data["name"], PDO::PARAM_STR],
            // FIXME: change to proper image upload ;)
            [":image", "https://via.placeholder.com/150x200", PDO::PARAM_STR],
            [":thumbnail", "https://via.placeholder.com/80x100", PDO::PARAM_STR],
            [":is_active", (bool) ($data["is_active"] ?? false), PDO::PARAM_BOOL]
        ];
    }
}
