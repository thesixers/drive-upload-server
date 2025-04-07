import express from 'express';
import cors from 'cors';
import expressUploader from 'express-fileupload';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import uploadFile from './middleware/upload.js';
config();

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://love-link.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(cookieParser());
app.use(expressUploader({useTempFiles: true}))

app.get('/', (req,res) => {
    res.send("welcome joe")
})

app.post('/uploadpics', async (req,res) => {
    if(!req.files) res.sendStatus(403)
    let url = await uploadFile(req.files)
    return url
})

app.listen(PORT, () => {
    console.log("server has started listening at port "+ PORT);
})