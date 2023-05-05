import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: mongoose.SchemaTypes.String,
    lastName: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String
}, {
    versionKey: false
})

export default mongoose.model("users-model", UserSchema, "Users")
