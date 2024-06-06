
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH,PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once "./models/Task.php";
class TaskController
{
    private $taskModel;
    public function __construct()
    {
        $this->taskModel = new Task();
    }

    public function index()
    {
        $tasks = $this->taskModel->getAllTasks();

        header('Content-Type: application/json');
        echo json_encode($tasks);
        

    }

    public function create()
    {

        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['title']) || !isset($data['description'])) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }

        $taskId = $this->taskModel->createTask($data["title"], $data["description"]);

        if ($taskId) {
            http_response_code(201); // Created
            echo json_encode(['message' => 'Tarea creada con éxito', 'id' => $taskId]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Error al crear la tarea']);
        }
    }
    public function update()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['title']) || !isset($data['description'])||!isset($data['completed'] )) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }


        $taskId = $this->taskModel->updateTask($data["title"], $data["description"],($data["completed"]==true?1:0),$data["id"]);
        echo $taskId;
    }
    public function delete()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['idTask'])) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }

        $result = $this->taskModel->deleteTask($data['idTask']);

        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Tarea eliminada con éxito']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar la tarea']);
        }
    }
    public function filterState()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['completeState'])) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }
        $tasks=[];
         if($data['completeState']=="*"){
            $tasks = $this->taskModel->getAllTasks();    
            echo json_encode($tasks);
            return;
         }else{
            $tasks = $this->taskModel->filterState($data['completeState']);
         }

        
        echo json_encode($tasks);
    }
    public function filterID()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id'])) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }
        
         
            $tasks = $this->taskModel->filterId($data['id']);
         

        
        echo json_encode($tasks);
    }
    public function complete()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['completeState'])|| !isset($data['idTask']) ) {
            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Campos incompletos']);
            return;
        }
        $tasks = $this->taskModel->completeTask($data['idTask'],$data['completeState']);
        echo $tasks;
        
    }
}

?>

