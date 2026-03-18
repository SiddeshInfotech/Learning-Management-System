import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("LMS Backend Running");
});

app.use("/api/auth", authRoutes);

export default app;