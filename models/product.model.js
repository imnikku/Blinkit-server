import { model, Schema, ObjectId } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Provide name"],
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: ObjectId,
        ref: "category",
      },
    ],
    sub_category: [
      {
        type: ObjectId,
        ref: "subcategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model("product", productSchema);
