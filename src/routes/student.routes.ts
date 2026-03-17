import express from "express";
import {
  createStudent,
  replaceStudent,
  updateStudent,
  deleteStudent
} from "../controllers/student.controller";

const router = express.Router();

// TEST ROUTE (very important for checking)
router.get("/test", (req, res) => {
  res.send("API working");
});

// POST - create
router.post("/create", createStudent);

// PUT - full replace
router.put("/put/:id", replaceStudent);

// PATCH - partial update
router.patch("/patch/:id", updateStudent);

// DELETE - remove
router.delete("/delete/:id", deleteStudent);

export default router;