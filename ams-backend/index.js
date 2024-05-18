// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
dotenv.config();

const app = express();

app.use(bodyParser.json());

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/ams';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', authRoutes); // Use employeeRoutes for employee-related routes

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
