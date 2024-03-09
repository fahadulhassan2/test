import { Schema, model } from "mongoose"

const adminSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
},
    { timestamps: true }
)

export const admin = model("admin", adminSchema);