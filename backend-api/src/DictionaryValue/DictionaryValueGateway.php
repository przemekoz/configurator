<?php

class DictionaryValueGateway extends BaseGateway
{
    public function __construct(Database $database)
    {
        parent::__construct($database);
        parent::setTableName("dictionary_value");
    }

    public function create(array $data): string
    {
        $params = $this->prepareQuery($data);
        return parent::createQuery("(name)", "(:name)", $params, $data);
    }

    public function update(array $current, array $new): int
    {
        $params = $this->prepareQuery($new);
        return parent::updateQuery("name = :name", $params, $current, $new);
    }

    private function prepareQuery($data): array
    {
        return [
            [":name", $data["name"], PDO::PARAM_STR],
        ];
    }
}
