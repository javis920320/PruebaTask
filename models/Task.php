<?php
require_once "core/Database.php";

class Task
{
    private $db;
    public function __construct()
    {
        $this->db = new Database();
    }

    public   function getAllTasks()
    {
        $sql = "SELECT * FROM tasks";
        $stmt = $this->db->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function createTask($title, $description)
    {


        $sql = "INSERT INTO tasks(title,description)VALUES(?,?)";
        $stmt = $this->db->pdo->prepare($sql);
        $stmt->execute([$title, $description]);
        return $this->db->pdo->lastInsertId();
    }
    
    public function filterId($id){
        $sql = "SELECT * FROM tasks WHERE id = ?";

        $stmt = $this->db->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }
    public function updateTask( $title, $description,$completed,$id)
    {
        if (!is_int($id) || !is_string($title) || !is_string($description) || !is_numeric($completed)) {
            throw new InvalidArgumentException('Invalid input types');
        }
    
        $sql = "UPDATE tasks SET title=?, description=?, completed=? WHERE id=?";
        $stmt = $this->db->pdo->prepare($sql);
    
        try {
            
            $stmt->execute([$title, $description, $completed ? 1 : 0, $id]);
        } catch (PDOException $e) {
            // Manejar errores de base de datos
            throw new Exception('Database error: ' . $e->getMessage());
        }
    
        // Verificar si se actualizó alguna fila
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public  function deleteTask($id)
    {
        $sql = "DELETE FROM tasks WHERE id=?";
        $smts = $this->db->pdo->prepare($sql);
        return $smts->execute([$id]);
    }

    public function completeTask($id, $completed)
    {
        $sql = "UPDATE tasks SET completed=? WHERE id =?";
        $smtm = $this->db->pdo->prepare($sql);
        return $smtm->execute([$completed, $id]);
    }
    public function filterState($completed)
    {

        $sql = "SELECT * FROM tasks WHERE completed = ?";

        $stmt = $this->db->pdo->prepare($sql);
        $stmt->execute([$completed]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
