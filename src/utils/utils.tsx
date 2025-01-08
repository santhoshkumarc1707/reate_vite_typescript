import * as Yup from "yup";
export interface Todo {
    id: string;
    TaskTitle: string;
    Description: string;
    DueOn: Date; // JavaScript Date object
    TaskStatus: string; // "To Do", "Working", "Final"
    TaskCategory: string; // "Work", "Personal", etc.
    AttachmentURL?: string; // File URL
} 


export const FormValidationSchema = Yup.object({
    TaskTitle: Yup.string().required("Task Title is required"),
    Description: Yup.string().required("Description is required"),
    DueOn: Yup.string().required("Due Date is required"),
    Attachment: Yup.mixed()
      .test(
        "fileType",
        "Only PDF and EXE files are allowed",
        (value) => {
          if (!value) return true; // Allow no file to be selected
          const file = value as File; // Explicitly casting value to File
          const allowedTypes = ["application/pdf", "application/x-msdownload"];
          return allowedTypes.includes(file.type);
        }
      )
      .nullable(),
  })
  