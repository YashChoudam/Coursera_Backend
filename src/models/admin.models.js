import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
},{timestamps: true}
);

const adminModels = mongoose.model("admin",adminSchema);
export default adminModels ;