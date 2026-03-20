import express, { Request, Response } from "express";
import studentRoutes from "./routes/student.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(express.json());

// base route
app.get("/", (req: Request, res: Response) => {
  res.send("LMS Backend Running");
});

// student routes
app.use("/api/student", studentRoutes); 
app.use("/api/admin", adminRoutes);

export default app;



