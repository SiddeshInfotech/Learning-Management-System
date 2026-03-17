import express, { Request, Response } from "express";
import studentRoutes from "./routes/student.routes";

const app = express();

app.use(express.json());

// base route
app.get("/", (req: Request, res: Response) => {
  res.send("LMS Backend Running");
});

// student routes
app.use("/api", studentRoutes);

export default app;