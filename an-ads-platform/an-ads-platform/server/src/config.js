import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
