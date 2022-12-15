<?php

class FilterGateway extends MainGateway
{
    public function __construct(PDO $connection)
    {
        parent::__construct($connection);
        parent::setTableName("__filters__");
    }

    public function getAll(): array
    {
        parse_str($_SERVER["QUERY_STRING"], $output);
        $code = $output["type"];

        $sql = "SELECT 
            d.id as `id`, 
            d.name as `name`, 
            d.code as `code`, 
            d.multiple as `multiple`, 
            dv.name as `label`, 
            dv.code as `value`
        FROM dictionary d 
        INNER JOIN dictionary_value dv ON dv.dictionary_id = d.id
        WHERE d.predefined = 0
        ORDER BY d.id";

        $stmt = $this->conn->prepare($sql);

        // $stmt->bindValue(":code", $code, PDO::PARAM_STR);

        $stmt->execute();

        $data = [];
        while ($item = $stmt->fetch(PDO::FETCH_ASSOC)) {

            list("id" => $id, "name" => $name, "code" => $code, "multiple" => $multiple, "label" => $label, "value" => $value) = $item;

            $found_key = array_search($id, array_column($data, "id"));

            if ($found_key !== false) {
                $data[$found_key]["options"][] = array("label" => $label, "value" => $value);
            } else {
                $data[] = array("id" => $id, "name" => $name, "code" => $code, "multiple" => (bool) $multiple, "options" => array(array("label" => $label, "value" => $value)));
            }
        }

        return ["data" => $data, "total" => -1];
    }
}


// export const filtersResponse: FiltersDefinition[] = [
//     {
//       id: 1,
//       name: "Type",
//       code: "type",
//       multiple: false,
//       options: [
//         { label: "Type 1", value: "type_1" },
//         { label: "Type 2", value: "type_2" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Material",
//       code: "material",
//       multiple: true,
//       options: [
//         { label: "Material 1", value: "material_1" },
//         { label: "Material 2", value: "material_2" },
//         { label: "Material 3", value: "material_3" },
//       ],
//     },
//   ];


// <?php

// $data = [];
// $data[] = array("id" => 1, "name"=> "TEST", "code" => "a");
// $data[] = array("id" => 1, "name"=> "TEST", "code" => "b");
// $data[] = array("id" => 2, "name"=> "TEST 2", "code" => "c");

// $new = [];

// foreach($data as $item) {
// 	list("id" => $id, "name" => $name, "code" => $code) = $item;
	
// 	$found_key = array_search($id, array_column($new, "id"));
	
// 	echo "---> ";
// 	echo $found_key;
// 	echo " <---";
// 	if ($found_key >= 0) {
// 		$new[$found_key]["options"][] = array("label" => $code);	
// 	}
// 	else {
// 		$new[] = array("id" => $id, "name" => $name, "otions" => array(array("label" => $code)));
// 		// $new[] = array("id" => $id, "name" => $name);
// 	}
// }

// print_r($new);


// $data = [];
// $data[] = array("id" => 1, "name"=> "TEST", "code" => "a");
// $data[] = array("id" => 2, "name"=> "TEST", "code" => "b");
// $data[] = array("id" => 3, "name"=> "TEST 2", "code" => "c");
// $data[] = array("id" => 1, "name"=> "TEST 2", "code" => "c");


// $new = [];

// foreach($data as $item) {
// 	list("id" => $id, "name" => $name, "code" => $code) = $item;
	
// 	$found_key = array_search($id, array_column($new, "id"));
	
// 	var_dump($found_key);
	
// 	if ($found_key !== false) {
// 		$new[$found_key]["options"][] = array("label" => $code);	
// 	}
// 	else {
// 		$new[] = array("id" => $id, "name" => $name, "options" => array(array("label" => $code)));
// 		// $new[] = array("id" => $id, "name" => $name);
// 	}
// }

// print_r($new);