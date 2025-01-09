import React, { useState } from "react";
const Border = ({ todos, onDelete, onUpdateStatus }) => {
    const [menuOpen, setMenuOpen] = useState(null);
    const handleUpdateStatus = (id, newStatus) => {
        onUpdateStatus(id, { TaskStatus: newStatus });
    };
    const categories = ["To Do", "In Progress", "Completed"];
    return (React.createElement("div", { className: "flex flex-wrap gap-6 p-4 sm:p-8" }, categories.map((category) => {
        const filteredTodos = todos.filter((todo) => todo.TaskStatus === category);
        return (React.createElement("div", { key: category, className: "flex-1 min-w-[300px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 rounded-lg" },
            React.createElement("h2", { className: "text-2xl font-semibold text-gray-800 text-center mb-6" }, category),
            filteredTodos.length === 0 ? (React.createElement("div", { className: "text-center text-gray-500" }, "No Data")) : (filteredTodos.map((todo) => (React.createElement("div", { key: todo.id, className: "relative mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" },
                React.createElement("h3", { className: "text-xl font-bold text-gray-800 mb-2" }, todo.TaskTitle),
                React.createElement("p", { className: "text-gray-600 mb-4" }, todo.Description),
                React.createElement("p", { className: "text-sm text-gray-500" },
                    "Due: ",
                    new Date(todo.DueOn).toLocaleDateString()),
                React.createElement("button", { className: "absolute top-2 right-2 text-gray-500 hover:text-gray-700", onClick: () => setMenuOpen((prev) => (prev === todo.id ? null : todo.id)) }, "\u22EE"),
                menuOpen === todo.id && (React.createElement("div", { className: "absolute top-10 right-2 bg-white border-2 border-gray-300 rounded-lg shadow-md z-10 w-36" },
                    category !== "Completed" && (React.createElement("button", { onClick: () => handleUpdateStatus(todo.id, "In Progress"), className: "block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg" }, "Move to In Progress")),
                    category !== "To Do" && (React.createElement("button", { onClick: () => handleUpdateStatus(todo.id, "Completed"), className: "block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" }, "Move to Completed")),
                    React.createElement("button", { onClick: () => onDelete(todo.id), className: "block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg" }, "Delete")))))))));
    })));
};
export default Border;
