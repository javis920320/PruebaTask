import { Link, useNavigate, useParams } from "react-router-dom";
import useTask from "../hooks/useTask";
import { useEffect, useState } from "react";
import Section from "./Section";
import Container from "./Container";
import Button from "./Button";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findTaskForId, updateTask } = useTask();
  const initialState = {
    title: "",
    description: "",
    completed: false,
  };

  const [task, setTask] = useState(initialState);
  const loaddata = async () => {
    const fetchedTask = await findTaskForId(id);
    if (fetchedTask) {
      setTask(fetchedTask[0]);
    }
  };

  useEffect(() => {
    loaddata();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task);

    console.log("Task updated successfully!");
    navigate("/");
  };

  return (
    <Section>
      <Container>
        <h1 className="text-white text-center text-2xl">Edita Tarea</h1>
        <Link className="text-blue-700" to="/">
          /Lista de Tareas
        </Link>

        {task && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 my-2"
              value={task.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              required
              className="w-full p-2 my-2"
              value={task.description}
              onChange={handleChange}
            />
            <label className="flex items-center">
              <span className="text-white">Completed:</span>
              <input
                type="checkbox"
                name="completed"
                checked={task.completed > 0 ? true : false}
                onChange={handleChange}
                className="ml-2"
              />
            </label>
            <Button>Editar</Button>
          </form>
        )}
      </Container>
    </Section>
  );
};

export default Edit;
