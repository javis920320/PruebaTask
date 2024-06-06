<?php
require_once "./controllers/TaskController.php";
class Router
{
    private $controller;
    public  function __construct()
    {
        $this->controller = new TaskController();
    }

    public function route()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


        switch ($uri) {
            case '/tasks/':

                $this->controller->index();
                break;
            case '/tasks/create':
                $this->controller->create();
                break;
            case '/tasks/update':
                $this->controller->update();
                break;
            case '/tasks/delete':
                $this->controller->delete();
                break;
            case '/tasks/filter':
                $this->controller->filterState();
                break;
            case '/tasks/serch':
                $this->controller->filterID();
                break;
            case '/tasks/complete':
                $this->controller->complete();
                break;
            default:
                http_response_code(404);
                echo "404 Not Found ";
                break;
        }
    }
}
