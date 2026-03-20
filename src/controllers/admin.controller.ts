import { Request, Response } from "express";
import Admin from "../models/admin.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createAdmin = async (req: any, res: any) => {
  try {
    const admin = await Admin.create(req.body);

    res.status(201).json({
      message: "Admin created successfully",
      admin
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //  Compare hashed password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
};