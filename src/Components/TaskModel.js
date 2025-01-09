import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
const FormValidationSchema = Yup.object().shape({
    TaskTitle: Yup.string().required("Required"),
    Description: Yup.string().required("Required"),
    DueOn: Yup.date().required("Required"),
});
const initialValues = {
    TaskTitle: "",
    Description: "",
    DueOn: "",
    TaskStatus: "To Do",
    TaskCategory: "Work",
    Attachment: null,
};
const TaskModal = ({ setModalOpen }) => {
    const todoCollection = collection(db, "todos");
    const addTodo = async (values) => {
        try {
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
            setModalOpen(false);
        }
        catch (error) {
            console.error("Error adding document: ", error);
            // Handle error, e.g., display an error message to the user
        }
    };
    const formik = useFormik({
        initialValues,
        validationSchema: FormValidationSchema,
        onSubmit: (values) => {
            addTodo(values);
            formik.resetForm();
        },
    });
    return (React.createElement("div", { className: "fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 md:p-8 z-50" },
        " ",
        React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-md" },
            React.createElement("div", { className: "flex justify-between items-center mb-4" },
                React.createElement("h2", { className: "text-xl font-semibold" }, "Create Task"),
                React.createElement("button", { type: "button", onClick: () => setModalOpen(false), className: "text-gray-500 hover:text-gray-700" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })))),
            React.createElement("form", { onSubmit: formik.handleSubmit },
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "TaskTitle", className: "block text-gray-700 font-medium mb-2" }, "Task Title"),
                    React.createElement("input", { type: "text", id: "TaskTitle", name: "TaskTitle", placeholder: "Task Title", value: formik.values.TaskTitle, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }),
                    formik.touched.TaskTitle && formik.errors.TaskTitle && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, formik.errors.TaskTitle))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "Description", className: "block text-gray-700 font-medium mb-2" }, "Description"),
                    React.createElement("textarea", { id: "Description", name: "Description", placeholder: "Description", value: formik.values.Description, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y" // Added textarea and resize
                     }),
                    formik.touched.Description && formik.errors.Description && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, formik.errors.Description))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "DueOn", className: "block text-gray-700 font-medium mb-2" }, "Due On"),
                    React.createElement("input", { type: "datetime-local", id: "DueOn", name: "DueOn", value: formik.values.DueOn, onChange: formik.handleChange, onBlur: formik.handleBlur, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }),
                    formik.touched.DueOn && formik.errors.DueOn && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, formik.errors.DueOn))),
                React.createElement("div", { className: "mb-4 flex space-x-4" },
                    React.createElement("div", { className: "w-1/2" },
                        React.createElement("label", { htmlFor: "TaskCategory", className: "block text-gray-700 font-medium mb-2" }, "Category"),
                        React.createElement("select", { id: "TaskCategory", name: "TaskCategory", value: formik.values.TaskCategory, onChange: formik.handleChange, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" },
                            React.createElement("option", { value: "Work" }, "Work"),
                            React.createElement("option", { value: "Personal" }, "Personal"))),
                    React.createElement("div", { className: "w-1/2" },
                        React.createElement("label", { htmlFor: "TaskStatus", className: "block text-gray-700 font-medium mb-2" }, "Status"),
                        React.createElement("select", { id: "TaskStatus", name: "TaskStatus", value: formik.values.TaskStatus, onChange: formik.handleChange, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" },
                            React.createElement("option", { value: "To Do" }, "To Do"),
                            React.createElement("option", { value: "In Progress" }, "In Progress"),
                            React.createElement("option", { value: "Completed" }, "Completed")))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "Attachment", className: "block text-gray-700 font-medium mb-2" }, "Attachment"),
                    React.createElement("input", { type: "file", id: "Attachment", name: "Attachment", onChange: (e) => {
                            const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                            formik.setFieldValue("Attachment", file);
                        }, className: "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" })),
                React.createElement("div", { className: "flex justify-end space-x-2" },
                    React.createElement("button", { type: "button", onClick: () => setModalOpen(false), className: "bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors" }, "Cancel"),
                    React.createElement("button", { type: "submit", className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors" }, "Create"))))));
};
export default TaskModal;
