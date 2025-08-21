
// Verifica el token JWT
// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos info del usuario en req
    console.log("Usuario autenticado:", req.user); // log para debug
    next();
  } catch (error) {
    console.error("Token inválido:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};


// Solo para admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
