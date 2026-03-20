import express from "express";
import {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  getStudentById,
  getDashboardStats,
  uploadDocuments,
  confirmStudent,
  makePayment
} from "../controllers/student.controller";

import { verifyAdmin } from "../middleware/auth.middleware";

const router = express.Router();


// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("API working");
});


// DASHBOARD (PUT THIS BEFORE :id)
router.get("/dashboard", verifyAdmin, getDashboardStats);


// STEP 1 — Start Registration
router.post("/start", verifyAdmin, createStudent);


// STEP 2 — Course Details
router.patch("/:id/course", verifyAdmin, updateStudent);


// STEP 3 — Basic Details
router.patch("/:id/basic", verifyAdmin, updateStudent);


// STEP 4 — Address Details
router.patch("/:id/address", verifyAdmin, updateStudent);


// STEP 5 — Contact Details
router.patch("/:id/contact", verifyAdmin, updateStudent);


// STEP 6 — Education Details
router.patch("/:id/education", verifyAdmin, updateStudent);


// STEP 7 — Health Details
router.patch("/:id/health", verifyAdmin, updateStudent);


// STEP 8 — Upload Documents
router.post("/:id/upload", verifyAdmin, uploadDocuments);


// CONFIRM REGISTRATION
router.post("/:id/confirm", verifyAdmin, confirmStudent);


// PAYMENT
router.post("/:id/payment", verifyAdmin, makePayment);


// VIEW ALL STUDENTS
router.get("/students", verifyAdmin, getStudents);


// KEEP DYNAMIC ROUTES AT LAST
router.get("/:id", verifyAdmin, getStudentById);


// DELETE STUDENT
router.delete("/:id", verifyAdmin, deleteStudent);


export default router;