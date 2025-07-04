import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRouter.js';
import mediaRouter from './routes/mediaRouter.js';


const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/images',express.static('public/images'));

app.use('/api/users', usersRouter);
app.use('/api/media', mediaRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
