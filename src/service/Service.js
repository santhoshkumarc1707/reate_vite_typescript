import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FormValidationSchema } from '../utils/utils';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp, } from "firebase/firestore";
import { db } from "../firebase-config";
const initialValues = {
    TaskTitle: "",
    Description: "",
    DueOn: "",
    TaskStatus: "To Do",
    TaskCategory: "Work",
    Attachment: null,
};
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const todoCollection = collection(db, "todos");
    // Fetch Tasks from Firestore
    const fetchTodos = async () => {
        const querySnapshot = await getDocs(todoCollection);
        const fetchedTodos = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                DueOn: data.DueOn.toDate(), // Convert Firestore timestamp to JavaScript Date
            };
        });
        setTodos(fetchedTodos);
    };
    // Add New Task
    const addTodo = async (values) => {
        const newTodo = {
            TaskTitle: values.TaskTitle,
            Description: values.Description,
            DueOn: Timestamp.fromDate(new Date(values.DueOn)),
            TaskStatus: values.TaskStatus,
            TaskCategory: values.TaskCategory,
            AttachmentURL: values.Attachment
                ? URL.createObjectURL(values.Attachment)
                : "",
        };
        await addDoc(todoCollection, newTodo);
        fetchTodos();
        setModalOpen(false); // Close the modal
    };
    // Update Task Status
    const updateTaskStatus = async (id, newStatus) => {
        const todoDoc = doc(db, "todos", id);
        await updateDoc(todoDoc, { TaskStatus: newStatus });
        fetchTodos();
    };
    // Delete Task
    const deleteTodo = async (id) => {
        const todoDoc = doc(db, "todos", id);
        await deleteDoc(todoDoc);
        fetchTodos();
    };
    useEffect(() => {
        fetchTodos();
    }, []);
    // Formik for form handling and validation
    const formik = useFormik({
        initialValues,
        validationSchema: FormValidationSchema,
        onSubmit: (values) => {
            addTodo(values);
            formik.resetForm();
        },
    });
    // Render Tasks by Status
    const renderTasks = (status) => {
        return todos
            .filter((todo) => todo.TaskStatus === status)
            .map((todo) => (React.createElement("div", { key: todo.id, className: "border p-4 rounded-md mb-4 shadow-md bg-white" },
            React.createElement("h4", { className: "font-bold" }, todo.TaskTitle),
            React.createElement("p", null, todo.Description),
            React.createElement("p", { className: "text-sm text-gray-500" },
                "Due: ",
                new Date(todo.DueOn).toLocaleString()),
            React.createElement("p", null,
                "Category: ",
                todo.TaskCategory),
            React.createElement("p", null,
                "Status: ",
                todo.TaskStatus),
            todo.AttachmentURL && (React.createElement("a", { href: todo.AttachmentURL, target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 underline" }, "View Attachment")),
            React.createElement("div", { className: "mt-2" },
                React.createElement("label", null,
                    "Move to:",
                    React.createElement("select", { value: todo.TaskStatus, onChange: (e) => updateTaskStatus(todo.id, e.target.value), className: "ml-2 p-1 border rounded" },
                        React.createElement("option", { value: "To Do" }, "To Do"),
                        React.createElement("option", { value: "Working" }, "Working"),
                        React.createElement("option", { value: "Final" }, "Final"))),
                React.createElement("button", { onClick: () => deleteTodo(todo.id), className: "text-red-500 ml-4" }, "Delete")))));
    };
    return (React.createElement("div", { className: "container mx-auto p-4" },
        React.createElement("h1", { className: "text-3xl font-bold mb-6 text-center" }, "Task Manager"),
        React.createElement("button", { onClick: () => setModalOpen(true), className: "bg-blue-500 text-white py-2 px-4 rounded mb-4" }, "Create New Task"),
        isModalOpen && (React.createElement("div", { className: "fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" },
            React.createElement("div", { className: "bg-white p-6 rounded shadow-lg w-1/3" },
                React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Create Task"),
                React.createElement("form", { onSubmit: formik.handleSubmit },
                    React.createElement("input", { type: "text", name: "TaskTitle", placeholder: "Task Title", value: formik.values.TaskTitle, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-2 mb-2 border rounded" }),
                    formik.touched.TaskTitle && formik.errors.TaskTitle && (React.createElement("p", { className: "text-red-500" }, formik.errors.TaskTitle)),
                    React.createElement("input", { type: "text", name: "Description", placeholder: "Description", value: formik.values.Description, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-2 mb-2 border rounded" }),
                    formik.touched.Description && formik.errors.Description && (React.createElement("p", { className: "text-red-500" }, formik.errors.Description)),
                    React.createElement("input", { type: "datetime-local", name: "DueOn", value: formik.values.DueOn, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-2 mb-2 border rounded" }),
                    formik.touched.DueOn && formik.errors.DueOn && (React.createElement("p", { className: "text-red-500" }, formik.errors.DueOn)),
                    React.createElement("select", { name: "TaskCategory", value: formik.values.TaskCategory, onChange: formik.handleChange, className: "w-full p-2 mb-2 border rounded" },
                        React.createElement("option", { value: "Work" }, "Work"),
                        React.createElement("option", { value: "Personal" }, "Personal")),
                    React.createElement("select", { name: "TaskStatus", value: formik.values.TaskStatus, onChange: formik.handleChange, className: "w-full p-2 mb-2 border rounded" },
                        React.createElement("option", { value: "To Do" }, "To Do"),
                        React.createElement("option", { value: "Working" }, "Working"),
                        React.createElement("option", { value: "Final" }, "Final")),
                    React.createElement("input", { type: "file", name: "Attachment", onChange: (e) => {
                            const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                            formik.setFieldValue("Attachment", file);
                        }, className: "w-full p-2 mb-4 border rounded" }),
                    formik.touched.Attachment && formik.errors.Attachment && (React.createElement("p", { className: "text-red-500" }, formik.errors.Attachment)),
                    React.createElement("div", { className: "flex justify-end" },
                        React.createElement("button", { type: "button", onClick: () => setModalOpen(false), className: "bg-gray-300 text-black py-2 px-4 rounded mr-2" }, "Cancel"),
                        React.createElement("button", { type: "submit", className: "bg-blue-500 text-white py-2 px-4 rounded" }, "Add Task")))))),
        React.createElement("div", { className: "grid grid-cols-3 gap-4" },
            React.createElement("div", null,
                React.createElement("h2", { className: "text-2xl font-bold mb-2" }, "To Do"),
                renderTasks("To Do")),
            React.createElement("div", null,
                React.createElement("h2", { className: "text-2xl font-bold mb-2" }, "Working"),
                renderTasks("Working")),
            React.createElement("div", null,
                React.createElement("h2", { className: "text-2xl font-bold mb-2" }, "Final"),
                renderTasks("Final")))));
};
export default TodoList;
