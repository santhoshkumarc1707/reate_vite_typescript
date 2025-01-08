import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FormValidationSchema } from '../utils/utils'
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { Todo } from "../utils/utils";

const initialValues= {
    TaskTitle: "",
    Description: "",
    DueOn: "",
    TaskStatus: "To Do",
    TaskCategory: "Work",
    Attachment: null as File | null,
  }

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
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
        }) as Todo[];
        setTodos(fetchedTodos);
    };

    // Add New Task
    const addTodo = async (values: typeof formik.initialValues) => {
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
    const updateTaskStatus = async (id: string, newStatus: string) => {
        const todoDoc = doc(db, "todos", id);
        await updateDoc(todoDoc, { TaskStatus: newStatus });
        fetchTodos();
    };

    // Delete Task
    const deleteTodo = async (id: string) => {
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
    const renderTasks = (status: string) => {
        return todos
            .filter((todo) => todo.TaskStatus === status)
            .map((todo) => (
                <div
                    key={todo.id}
                    className="border p-4 rounded-md mb-4 shadow-md bg-white"
                >
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
            ));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
                Create New Task
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Create Task</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text"
                                name="TaskTitle"
                                placeholder="Task Title"
                                value={formik.values.TaskTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mb-2 border rounded"
                            />
                            {formik.touched.TaskTitle && formik.errors.TaskTitle && (
                                <p className="text-red-500">{formik.errors.TaskTitle}</p>
                            )}
                            <input
                                type="text"
                                name="Description"
                                placeholder="Description"
                                value={formik.values.Description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mb-2 border rounded"
                            />
                            {formik.touched.Description && formik.errors.Description && (
                                <p className="text-red-500">{formik.errors.Description}</p>
                            )}
                            <input
                                type="datetime-local"
                                name="DueOn"
                                value={formik.values.DueOn}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 mb-2 border rounded"
                            />
                            {formik.touched.DueOn && formik.errors.DueOn && (
                                <p className="text-red-500">{formik.errors.DueOn}</p>
                            )}
                            <select
                                name="TaskCategory"
                                value={formik.values.TaskCategory}
                                onChange={formik.handleChange}
                                className="w-full p-2 mb-2 border rounded"
                            >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                            </select>
                            <select
                                name="TaskStatus"
                                value={formik.values.TaskStatus}
                                onChange={formik.handleChange}
                                className="w-full p-2 mb-2 border rounded"
                            >
                                <option value="To Do">To Do</option>
                                <option value="Working">Working</option>
                                <option value="Final">Final</option>
                            </select>
                            <input
                                type="file"
                                name="Attachment"
                                onChange={(e) => {
                                    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                                    formik.setFieldValue("Attachment", file);
                                }}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            {formik.touched.Attachment && formik.errors.Attachment && (
                                <p className="text-red-500">{formik.errors.Attachment}</p>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2">To Do</h2>
                    {renderTasks("To Do")}
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Working</h2>
                    {renderTasks("Working")}
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Final</h2>
                    {renderTasks("Final")}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
