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
  Attachment: null as File | null,
};

interface TaskModalProps {
  setModalOpen: (open: boolean) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ setModalOpen }) => {
  const todoCollection = collection(db, "todos");

  const addTodo = async (values: typeof initialValues) => {
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
    } catch (error) {
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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 md:p-8 z-50"> {/* Added z-50 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button type="button" onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="TaskTitle" className="block text-gray-700 font-medium mb-2">Task Title</label>
            <input
              type="text"
              id="TaskTitle"
              name="TaskTitle"
              placeholder="Task Title"
              value={formik.values.TaskTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.TaskTitle && formik.errors.TaskTitle && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.TaskTitle}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="Description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="Description"
              name="Description"
              placeholder="Description"
              value={formik.values.Description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y" // Added textarea and resize
            />
            {formik.touched.Description && formik.errors.Description && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.Description}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="DueOn" className="block text-gray-700 font-medium mb-2">Due On</label>
            <input
              type="datetime-local"
              id="DueOn"
              name="DueOn"
              value={formik.values.DueOn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.DueOn && formik.errors.DueOn && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.DueOn}</p>
            )}
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="TaskCategory" className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                id="TaskCategory"
                name="TaskCategory"
                value={formik.values.TaskCategory}
                onChange={formik.handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="TaskStatus" className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                id="TaskStatus"
                name="TaskStatus"
                value={formik.values.TaskStatus}
                onChange={formik.handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="Attachment" className="block text-gray-700 font-medium mb-2">Attachment</label>
            <input
              type="file"
              id="Attachment"
              name="Attachment"
              onChange={(e) => {
                const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                formik.setFieldValue("Attachment", file);
              }}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;