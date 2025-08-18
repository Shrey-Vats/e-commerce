import e from "express";
import cooki from "cookie-parser"
import authRouter from "./Routes/authRoute.ts";

const app = e();
const PORT = process.env.PORT || 3000

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cooki());

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app