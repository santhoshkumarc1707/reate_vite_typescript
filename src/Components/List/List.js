import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const List = ({ todos, onDelete, onUpdateStatus }) => {
    const categories = ["To Do", "In Progress", "Completed"];
    const [menuOpen, setMenuOpen] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleCategoryChange = async (todo, newCategory) => {
        setLoading(true); // Show loading spinner
        await onUpdateStatus(todo.id, { TaskStatus: newCategory });
        setLoading(false); // Hide loading spinner after update
    };
    return (React.createElement("div", { className: "flex flex-col gap-8 p-4 relative" }, categories.map((category) => {
        // Assign different background colors for each category
        let bgColor = "";
        switch (category) {
            case "To Do":
                bgColor = "bg-pink-200"; // Light pink for To Do
                break;
            case "In Progress":
                bgColor = "bg-blue-200"; // Light blue for In Progress
                break;
            case "Completed":
                bgColor = "bg-green-200"; // Light green for Completed
                break;
            default:
                bgColor = "bg-gray-200";
        }
        return (React.createElement("div", { key: category, className: "mb-8 min-w-[400px] min-h-[250px] bg-slate-100 p-2 relative" },
            React.createElement("h2", { className: `text-xl font-bold mb-4 text-center ${bgColor} p-2 rounded-md` }, category),
            loading && (React.createElement("div", { className: "absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-20" },
                React.createElement(FontAwesomeIcon, { icon: faSpinner, className: "animate-spin text-gray-700" }))),
            React.createElement("div", { className: "space-y-4" }, todos
                .filter((todo) => todo.TaskStatus === category)
                .map((todo) => (React.createElement("div", { key: todo.id, className: "flex items-center bg-white p-4 rounded-lg shadow-md space-x-6" },
                React.createElement("div", { className: "flex-1" },
                    React.createElement("p", { className: "text-gray-600" }, todo.TaskTitle)),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("p", { className: "text-gray-600" }, todo.Description)),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("p", { className: "text-sm text-gray-500" }, new Date(todo.DueOn).toLocaleDateString())),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("p", { className: "text-sm text-gray-500" }, todo.TaskCategory)),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("select", { value: todo.TaskStatus, onChange: (e) => handleCategoryChange(todo, e.target.value), className: "p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500", disabled: loading }, categories.map((category) => (React.createElement("option", { key: category, value: category }, category))))),
                React.createElement("div", { className: "flex items-center space-x-2" },
                    React.createElement("button", { className: "text-gray-500 hover:text-gray-700", onClick: () => setMenuOpen((prev) => (prev === todo.id ? null : todo.id)) }, "\u22EE"),
                    menuOpen === todo.id && (React.createElement("div", { className: "absolute bg-white border rounded shadow-md z-10 right-4 top-12" },
                        React.createElement("button", { onClick: () => onDelete(todo.id), className: "block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" }, "Delete"))))))))));
    })));
};
export default List;
