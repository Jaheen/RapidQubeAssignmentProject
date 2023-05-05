import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    title: mongoose.SchemaTypes.String,
    isCompleted: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
}, {
    versionKey: false
})

export default mongoose.model("todos-model", TodoSchema, "Todos")
