import React, { useState } from "react";
import Section from "../components/Section";
import useTask from "../hooks/useTask";
import { Link } from "react-router-dom";
import Clock from "../svg/clock";
import Container from "../components/Container";
import Trash from "../svg/Trash";
import Pencil from "../svg/Pencil";
import Switch from "../components/Switch";
const URLSERVE = import.meta.env.VITE_URL_SERVER;

const List = () => {
    const { tasks, errors, filterStatus } = useTask();
    const [complatedState, setCompleted] = useState(null);
    const handelChange = (event) => {
        setCompleted(event.target.value);
        filterStatus(event.target.value);
    };
    return (
        <Section>
            <h1 className="text-lg text-white text-center">
                Lista de Tareas server = {URLSERVE}
            </h1>

            <Container>
                <div className="flex justify-between ">
                    <Link
                        to="/task/create"
                        className="px-4 py-2 my-4 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                    >
                        + Crear Tarea
                    </Link>

                    {errors && (
                        <p className=" my-4 p-4 bg-red-400 text-white">
                            {" "}
                            Error con la conexion al sevidor: {errors.message}
                        </p>
                    )}
                    <select onChange={handelChange} className="border rounded px-3  focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="*" defaultChecked>
                            Todas Las tareas
                        </option>
                        <option value="1">Completadas</option>
                        <option value="0">Incompleta</option>
                    </select>
                </div>

                <ul>
                    {tasks.length > 0 ? (
                        tasks.map(
                            ({
                                id,
                                title,
                                description,
                                fechaRegistro,
                                completed,
                            }) => (
                                <li className="bg-gray-200 text-black py-4 px-4 rounded hover:bg-gray-300 cursor-pointer flex items-center justify-between">
                                    <div class="flex flex-col flex-grow">
                                        <h2 class="text-xl font-bold">
                                            {title}
                                        </h2>
                                        <p class="text-base">{description}</p>
                                        <small class="flex justify-start gap-2">
                                            <Clock class="text-xl" />
                                            {fechaRegistro}
                                        </small>
                                        {completed > 0 ? (
                                            <Switch
                                                title={"Completo"}
                                                completed={completed}
                                            />
                                        ) : (
                                            <Switch
                                                title={"Incompleto"}
                                                completed={completed}
                                            />
                                        )}
                                    </div>
                                    <div class="flex gap-2">
                                        <Link
                                            to={`/task/${id}/delete`}
                                            class="text-black hover:text-red-500 focus:outline-none"
                                            title="Eliminar"
                                        >
                                            <Trash class="text-xl" />
                                        </Link>
                                        <Link
                                            to={`/task/${id}/edit`}
                                            class="text-black hover:text-blue-500 focus:outline-none"
                                            title="Editar"
                                        >
                                            <Pencil class="text-xl" />
                                        </Link>
                                    </div>
                                </li>
                            )
                        )
                    ) : (
                        <h1 className="text-white bg-slate-400 p-4 text-center border-spacing-0 my-2 border-2">No hay tareas por mostrar</h1>
                    )}
                </ul>
            </Container>
        </Section>
    );
};

export default List;
