import React from "react";
import Section from "../components/Section";
import useTask from "../hooks/useTask";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import InputText from "../components/InputText";
import Button from "../components/Button";

const Create = () => {
    const navigate = useNavigate();
    const {handleInputChange,newTaskData,handleAddTask} = useTask();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTask()
        navigate("/")

    };
    return (
        <Section>
            <Container>
                <h1 className="text-white  text-center">Crear Tarea</h1>
                <Link className=" text-blue-400" to={"/"}>
                    Lista Tareas/
                </Link>
                
                <form onSubmit={handleSubmit}>
                    <InputText label={"Titulo"} name={"title"} onChange={handleInputChange} />
                    <InputText label={"Descripcion"} name={"description"} onChange={handleInputChange} />

                    <Button>Crear tarea</Button> 
                </form>
            </Container>
        </Section>
    );
};

export default Create;
