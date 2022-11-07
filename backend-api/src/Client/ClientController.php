<?php

class ClientController
{

    private $name = "Client";

    public function __construct(private ClientGateway $gateway)
    {
    }
    
    public function processRequest(string $method, ?string $id): void
    {
        if ($id) {
            $this->processResourceRequest($method, $id);
            return;
        }
            
        $this->processCollectionRequest($method);
    }
    
    private function processResourceRequest(string $method, string $id): void
    {
        $client = $this->gateway->get($id);
        
        if (!$client) {
            http_response_code(404);
            echo json_encode(["message" => "$this->name not found"]);
            return;
        }
        
        switch ($method) {
            case "GET":
                echo json_encode($client);
                break;
                
            case "PUT":
                $data = (array) json_decode(file_get_contents("php://input"), true);

                $errors = $this->getValidationErrors($data, false);
                
                if ( ! empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                
                $rows = $this->gateway->update($client, $data);
                
                echo json_encode([
                    "id" => $id,
                    "message" => "$this->name $id updated",
                    "rows" => $rows
                ]);
                break;
                
            case "DELETE":
                $rows = $this->gateway->delete($id);
                
                echo json_encode([
                    "message" => "$this->name $id deleted",
                    "rows" => $rows
                ]);
                break;

            case "OPTIONS":
                echo json_encode([
                    "message" => "options"
                ]);
                break;
                
            default:
                http_response_code(405);
                header("Allow: PUT, GET, PATCH, DELETE, OPTIONS");
        }
    }
    
    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->gateway->getAll());
                break;

            case "DELETE":
                $rows = $this->gateway->deleteMany();

                echo json_encode(
                    array(["count" => $rows, "message" => "many {$this->name}s deleted"]),
                );

                break;
                
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                
                $errors = $this->getValidationErrors($data);
                
                if ( ! empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                
                $id = $this->gateway->create($data);
                
                http_response_code(201);
                echo json_encode([
                    "message" => "$this->name created",
                    "id" => $id
                ]);
                break;
            
            case "OPTIONS":
                echo json_encode([
                    "message" => "options"
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
    
    private function getValidationErrors(array $data, bool $is_new = true): array
    {
        $errors = [];

        if ($is_new && empty($data["name"])) {
            $errors[] = "name is required";
        }
        
        if (array_key_exists("discount", $data)) {
            if (filter_var($data["discount"], FILTER_VALIDATE_INT) === false) {
                $errors[] = "discount must be an integer";
            }
        }

        if (array_key_exists("email", $data)) {
            if (filter_var($data["email"], FILTER_VALIDATE_EMAIL) === false) {
                $errors[] = "email must be an email address";
            }
        }
        
        return $errors;
    }
}









