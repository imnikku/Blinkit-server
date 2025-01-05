import { model, Schema, ObjectId } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "user",
    },
    order_id: {
      type: String,
      required: [true, "Provide order_id"],
      unique: true,
    },
    product_id: {
      type: ObjectId,
      ref: "product",
    },
    product_details: {
      name: String,
      image: Array,
    },
    payment_id: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: ObjectId,
      ref: "address",
    },
    sub_total: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default model("order", orderSchema);
