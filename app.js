import express, { json, urlencoded } from "express";
import { connectionDB } from "./config/connecttionDB.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import adminRouter from "./routes/adminRoute.js";
import * as dotenv from 'dotenv'
dotenv.config()
connectionDB(String(process.env.NODE_ENV_DB_URL));

// connectionDB("mongodb://0.0.0.0:27017/mydata");
import cors from 'cors'

// router
const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

//  Middlware - plugin
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({
    'origin': '*',
}));

// routes
app.use("/api/v1", appointmentRouter);
app.use("/api/v1", adminRouter);
app.get("/", (req, res) => {
    return res.json({ messae: "hello" })
})
app.listen(PORT, () => console.log(`Server Started at PORT`))