import mongoose from "mongoose";

const StateSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    districts: [mongoose.SchemaTypes.String]
}, {
    versionKey: false
})

export default mongoose.model("states-model", StateSchema, "States")
