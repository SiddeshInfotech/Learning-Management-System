import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  enrolledCourses: mongoose.Types.ObjectId[];
}

const StudentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", StudentSchema);