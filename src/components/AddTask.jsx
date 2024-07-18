import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useAlert } from "react-alert";

import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

import "./AddTask.scss";
import { LiaCloneSolid } from "react-icons/lia";

const AddTask = ({ fetchTasks }) => {
    const [task, setTask] = useState("");

    const alert = useAlert();

    const onChange = (e) => {
        setTask(e.target.value);
    };

    const handleTaskAddition = async () => {
        try {
            if (task.length === 0) {
                return alert.error(
                    "A tarefa precisa de uma descricao para ser adicionada."
                );
            }

            await axios.post("http://localhost:8000/tasks", {
                description: task,
                isCompleted: false,
            });

            await fetchTasks();

            setTask("");
        } catch (error) {
            alert.error("Algo deu errado.");
        }
    };

    return (
        <div className="add-task-container">
            <CustomInput
                label="Adicionar tarefa"
                value={task}
                onChange={onChange}
            />
            <CustomButton onClick={handleTaskAddition}>
                <FaPlus size={14} color="#fff" />
            </CustomButton>
        </div>
    );
};

export default AddTask;
