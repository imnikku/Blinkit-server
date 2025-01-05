import { model, Schema, ObjectId } from "mongoose";

const cartProductSchema = new Schema(
  {
    product_id: {
      type: ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    user_id: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default model("cart", cartProductSchema);
