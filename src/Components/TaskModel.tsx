import React from "react";
import { useFormik } from "formik";
import { FormValidationSchema } from "../utils/utils";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";

const initialValues = {
  TaskTitle: "",
  Description: "",
  DueOn: "",
  TaskStatus: "To Do",
  TaskCategory: "Work",
  Attachment: null as File | null,
};

interface TaskModalProps {
  setModalOpen: (open: boolean) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ setModalOpen }) => {
  const todoCollection = collection(db, "todos");

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

    setModalOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationSchema,
    onSubmit: (values) => {
      addTodo(values);
      formik.resetForm();
    },
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 md:p-8">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-xs md:max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="TaskTitle"
            placeholder="Task Title"
            value={formik.values.TaskTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.TaskTitle && formik.errors.TaskTitle && (
            <p className="text-red-500 text-sm">{formik.errors.TaskTitle}</p>
          )}
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={formik.values.Description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.Description && formik.errors.Description && (
            <p className="text-red-500 text-sm">{formik.errors.Description}</p>
          )}
          <input
            type="datetime-local"
            name="DueOn"
            value={formik.values.DueOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.DueOn && formik.errors.DueOn && (
            <p className="text-red-500 text-sm">{formik.errors.DueOn}</p>
          )}
          <select
            name="TaskCategory"
            value={formik.values.TaskCategory}
            onChange={formik.handleChange}
            className="w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <select
            name="TaskStatus"
            value={formik.values.TaskStatus}
            onChange={formik.handleChange}
            className="w-full p-3 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="file"
            name="Attachment"
            onChange={(e) => {
              const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
              formik.setFieldValue("Attachment", file);
            }}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.Attachment && formik.errors.Attachment && (
            <p className="text-red-500 text-sm">{formik.errors.Attachment}</p>
          )}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
