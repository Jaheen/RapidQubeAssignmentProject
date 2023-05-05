import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    state: mongoose.SchemaTypes.String,
    district: mongoose.SchemaTypes.String,
    carId: mongoose.SchemaTypes.ObjectId,
    distance: mongoose.SchemaTypes.Number,
    payment: mongoose.SchemaTypes.Number,
    paymentType: mongoose.SchemaTypes.String,
    remarks: mongoose.SchemaTypes.String
})

export default mongoose.model("bookings-model", BookingSchema, "Bookings")
