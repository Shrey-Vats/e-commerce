import e from "express";
import { Login, Logout, Register } from "../Controllers/authController.js";

const app = e.Router();

app.post("/register", Register);
app.post("/login", Login);
app.get("logout", Logout);

export default app;