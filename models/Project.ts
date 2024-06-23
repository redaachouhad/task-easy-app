import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
