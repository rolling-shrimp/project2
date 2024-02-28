import mongoose from "mongoose";
const { Schema } = mongoose;
const orderSchema = new Schema({
  OrderID: { type: String, minlength: 6, maxlength: 10, required: true },
  CustID: { type: String, minlength: 7, maxlength: 10, required: true },
  TotalAmount: { type: Number, required: true, max: 100000000 },
  OrdStatus: { type: Number, required: true, enum: [1, 2, 3] },
  SalesName: { type: String, maxlength: 20, minlength: 2, required: true },
  OrderDate: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
