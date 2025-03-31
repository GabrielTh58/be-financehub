import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import transactionRoutes from "./routes/transactions";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: any, res:any) => {
    res.send("Hello World")
})

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`); 
})