import { useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd, onDelete }) {
    const [enteredTask, setEnteredTask] = useState('');

    function handleEnterTask(e) {
        setEnteredTask(e.target.value);
    }

    function handleClick(e) {
        if(enteredTask.trim() === ''){
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input
                onChange={(e) => handleEnterTask(e)}
                value={enteredTask}
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            />
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">
                Add Task
            </button>
        </div>
    );
}
