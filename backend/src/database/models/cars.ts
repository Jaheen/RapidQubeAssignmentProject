import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    image: mongoose.SchemaTypes.String,
    price: mongoose.SchemaTypes.Number,
    features: mongoose.SchemaTypes.String,
    mileage: mongoose.SchemaTypes.Number,
}, {
    versionKey: false
})

export default mongoose.model("cars-model", CarSchema, "Cars")
