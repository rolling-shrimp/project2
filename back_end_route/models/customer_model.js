import mongoose from "mongoose";
const { Schema } = mongoose;
const customerSchema = new Schema({
  CustID: { type: String, minlength: 7, maxlength: 10, required: true },
  Name: { type: String, maxlength: 20, minlength: 2, required: true },
  Country: { type: String, maxlength: 20, minlength: 2, required: true },
  State: { type: String, maxlength: 10, minlength: 2 },
  Zip: { type: Number, max: 999 },
  City: { type: String, maxlength: 20, required: true, minlength: 2 },
  Address: { type: String, maxlength: 100, minlength: 5, required: true },
  Status: { type: Number, required: true, enum: [1, 2, 3] },
});
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
