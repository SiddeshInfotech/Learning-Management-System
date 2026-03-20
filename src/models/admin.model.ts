import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// hash password before saving
adminSchema.pre("save", async function () {
  const admin = this as IAdmin;

  if (!admin.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

export default mongoose.model<IAdmin>("Admin", adminSchema);