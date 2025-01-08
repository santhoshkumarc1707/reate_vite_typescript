import React from "react";
import { Todo } from "../utils/utils";

interface TaskCardProps {
    todo: Todo;
    updateTaskStatus: (id: string, newStatus: string) => void;
    deleteTodo: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ todo, updateTaskStatus, deleteTodo }) => {
    return (
        <div className="border p-4 rounded-md mb-4 shadow-md bg-white">
            <h4 className="font-bold">{todo.TaskTitle}</h4>
            <p>{todo.Description}</p>
            <p className="text-sm text-gray-500">
                Due: {new Date(todo.DueOn).toLocaleString()}
            </p>
            <p>Category: {todo.TaskCategory}</p>
            <p>Status: {todo.TaskStatus}</p>
            {todo.AttachmentURL && (
                <a
                    href={todo.AttachmentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    View Attachment
                </a>
            )}
            <div className="mt-2">
                <label>
                    Move to:
                    <select
                        value={todo.TaskStatus}
                        onChange={(e) => updateTaskStatus(todo.id, e.target.value)}
                        className="ml-2 p-1 border rounded"
                    >
                        <option value="To Do">To Do</option>
                        <option value="Working">Working</option>
                        <option value="Final">Final</option>
                    </select>
                </label>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 ml-4"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
