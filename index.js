require('dotenv').config();
const https = require("https");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const router = require('./router/index')
const path = require('path')
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const app = express()

mongoose.set('strictQuery', false);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser({
    secret: 'yourSecret',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
}));
app.use(express.json());
app.use(cors({
    origin: ['http://45.12.236.177:3000', 'http://87.236.16.59', 'https://fit-work.store', 'http://fit-work.store', 'http://fit-work.ru', 'https://fit-work.ru'],
    credentials: true,
}));
app.use('/api', router);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        https
            .createServer(
                // Provide the private and public key to the server by reading each
                // file's content with the readFileSync() method.
                {
                    key: fs.readFileSync("key.pem"),
                    cert: fs.readFileSync("cert.pem"),
                },
                app
            )
            .listen(4000, () => {
                console.log("serever is runing at port 4000");
            });
        // app.listen(PORT, () => console.log(`server started on ${PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}

start();