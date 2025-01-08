import React from "react";
import TaskCard from "./TaskCard";
import { Todo } from "../utils/utils";

interface TaskListProps {
    title: string;
    todos: Todo[];
    updateTaskStatus: (id: string, newStatus: string) => void;
    deleteTodo: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, todos, updateTaskStatus, deleteTodo }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {todos.map((todo) => (
                <TaskCard
                    key={todo.id}
                    todo={todo}
                    updateTaskStatus={updateTaskStatus}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default TaskList;
