<?php

class BaseOneToManyController extends MainController
{
    
    public function processRequest(string $method, string $id): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->gateway->getAll($id));
                break;
                
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                
                $errors = $this->validationObject->validate($data);
                
                if ( ! empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                
                $id = $this->gateway->create($data, $id);
                
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
}
