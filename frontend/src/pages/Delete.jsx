import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import Container from "../components/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import useTask from "../hooks/useTask";

const Delete = () => {
    const { id } = useParams();
    const { findTaskForId, deleteTask } = useTask();
    const [task, setTask] = useState();
    const [respuest, setRespuest] = useState();
    const navigate = useNavigate();
    const loadserch=async()=>{
        const resp = await findTaskForId(id);
        
        if(resp){setTask(resp[0])};
        
    }
    useEffect(() => {
        loadserch(id)
        
    }, [id, findTaskForId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await deleteTask(task);
        setRespuest(resp);
        setTimeout(() => {
            setRespuest(null);
            navigate("/");
        }, 2000);
    };

    return (
        <Section>
            <Container>
                <form onSubmit={handleSubmit}>
                    {respuest ? (
                        <p className="bg-green-400 p-4 text-white text-">
                            {respuest}
                        </p>
                    ) : (
                        <p className="bg-orange-600 p-4 text-white text-">
                            Estas seguro de Eliminar?
                        </p>
                    )}

                    {task && (
                        <div className="bg-white shadow-lg rounded-lg p-6 w-full m-auto mt-10">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {task.title}
                            </h2>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-gray-500 mt-4">
                                {task.fechaRegistro} {task.completed}
                            </p>
                            <Button>Eliminar </Button>
                            <Link
                                to={"/"}
                                className="px-4 py-2 border border-gray-300 text-gray-500 rounded shadow-sm bg-white hover:bg-gray-100"
                            >
                                Cancelar
                            </Link>
                        </div>
                    )}
                </form>
            </Container>
        </Section>
    );
};

export default Delete;
