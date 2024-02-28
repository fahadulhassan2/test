import express, { json, urlencoded } from "express";
import { connectionDB } from "./config/connecttionDB.js";
import appointmentRouter from "./routes/appointmentRoute.js";

connectionDB(process.env.DB_URL || "mongodb+srv://fahadulhassan2:ttuC3WWSyKcc7wWP@zebascluster.up7nyqa.mongodb.net/?retryWrites=true&w=majority&appName=ZebasCluster");

// connectionDB("mongodb://0.0.0.0:27017/mydata");
import cors from 'cors'

// router
const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

//  Middlware - plugin
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/v1", appointmentRouter);
app.get("/", () => {
    return resizeBy.json({ messae: "hello" })
})
app.listen(PORT, () => console.log(`Server Started at PORT`))