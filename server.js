const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT

const app = express();
app.use(express.json());
app.use(cors());

// register routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

console.log("Starting our server");

mongoose
    .connect(process.env.Mongo_URI)
    .then(() => {
        server.listen(PORT, () =>{
            console.log(`Server is listeing on ${PORT}`);
        });
    })
    .catch(err => {
        console.log("Database connection error");
        console.log(err);
    });