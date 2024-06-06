import axios from "axios";
import { useEffect, useState } from "react";

const URLSERVE = import.meta.env.VITE_URL_SERVER;

const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState();
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${URLSERVE}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        setTasks(response.data);
      }
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setErrors(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        `${URLSERVE}create`,
        JSON.stringify(newTaskData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTasks([...tasks, { id: response.data.id, ...newTaskData }]);
      setNewTaskData({ title: "", description: "" });
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const findTaskForId = async (id) => {
    try {
      const resp = await axios.patch(
        `${URLSERVE}serch`,
        JSON.stringify({ id: id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status == 200) {
        return resp.data;
      }
    } catch (error) {}
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.patch(
        `${URLSERVE}update`,
        JSON.stringify(task),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response == 200) {
        setTasks([...tasks, { id: response.data.id, ...newTaskData }]);
        setNewTaskData({ title: "", description: "" });
      }
      
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const deleteTask = async (task) => {
    try {
      const { status, data } = await axios.patch(
        `${URLSERVE}delete`,
        JSON.stringify({ idTask: task.id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status == 200) {
        return data.message;
      }

      history.push("/tasks");
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
      alert("Hubo un error al eliminar la tarea");
    }
  };

  const filterStatus = async (completedstats) => {
    //const taskFilter = tasks.filter((task) => task.completed == completedstats);
    const taskFilter = await axios.patch(
      `${URLSERVE}filter`,
      JSON.stringify({ completeState: completedstats }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!taskFilter) {
      return null;
    }
    setTasks(taskFilter.data);
  };

  return {
    tasks,
    handleAddTask,
    handleInputChange,
    newTaskData,
    errors,
    findTaskForId,
    deleteTask,
    filterStatus,
    updateTask,
  };
};

export default useTask;
