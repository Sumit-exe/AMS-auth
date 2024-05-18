import express from "express";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from 'cors';


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

const mongoUrl = "mongodb://localhost:27017/ams";

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database conected")
}).catch((error)=>{
    console.log("Error connecting to Database - Error: " + error)
})

app.use(express.json());
app.use("/",employeeRoutes);

app.listen(PORT, () => {
  console.log(`App is running on PORT : ${PORT}`);
});
