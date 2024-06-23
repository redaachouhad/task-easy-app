import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      default: "",
    },
    nameOfProject: {
      type: String,
      required: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },

    urlImage: {
      type: String,
      default: "",
    },
    dateTimeFrom: {
      type: String,
      default: "",
    },
    dateTimeTo: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "",
    },
    nameOfImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;
