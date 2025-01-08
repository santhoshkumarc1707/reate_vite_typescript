import React from "react";
import TaskList from "./TaskList";
import { Todo } from "../utils/utils";

interface SharedContentProps {
    todos: Todo[];
    style: React.CSSProperties;
    updateTaskStatus: (id: string, status: string) => void;
    deleteTodo: (id: string) => void;
}

const SharedContent: React.FC<SharedContentProps> = ({ todos, style, updateTaskStatus, deleteTodo }) => {
    return (
        <div style={style}>
            <div className="grid grid-cols-3 gap-4">
                <TaskList
                    title="To Do"
                    todos={todos.filter((t) => t.TaskStatus === "To Do")}
                    updateTaskStatus={updateTaskStatus}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    title="Working"
                    todos={todos.filter((t) => t.TaskStatus === "Working")}
                    updateTaskStatus={updateTaskStatus}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    title="Final"
                    todos={todos.filter((t) => t.TaskStatus === "Final")}
                    updateTaskStatus={updateTaskStatus}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    );
};

export default SharedContent;
