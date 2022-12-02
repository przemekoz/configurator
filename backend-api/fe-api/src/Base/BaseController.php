<?php

class BaseController extends MainController
{

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

        // if string - specific method
        if (!is_numeric($id)) {
            $methodName = strpos($id, "?") ? substr($id, 0, strpos($id, "?")) : $id;
            $data = $this->gateway->getDynamicMethod($methodName);
            echo json_encode([
                "method" => $methodName,
                "data" => $data
            ]);
            return;
        }

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



            case "OPTIONS":
                echo json_encode([
                    "message" => "options"
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, OPTIONS");
        }
    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->gateway->getAll());
                break;

            case "OPTIONS":
                echo json_encode([
                    "message" => "options"
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, OPTIONS");
        }
    }
}
