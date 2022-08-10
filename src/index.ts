import express, { Application } from "express";
import cors from "cors";
import indexRouter from "./route/index";
const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Route
app.use(indexRouter);

app.listen(3000);
console.log('Server running on port 3000');