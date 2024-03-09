import { Schema, model } from "mongoose"

const appointmentSchema = new Schema({
    name: String,
    email: String,
    date: String,
    phone: String,
    slot: String,
    testCategory: String,
    testPrice: String
},
    { timestamps: true }
)
const appointment = model("appointment", appointmentSchema)
export default appointment     