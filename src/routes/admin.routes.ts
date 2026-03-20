import express from "express";
import { loginAdmin,createAdmin } from "../controllers/admin.controller";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/create", createAdmin);

export default router;