import jwt from "jsonwebtoken";

export const verifyAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};