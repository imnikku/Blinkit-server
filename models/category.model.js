import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      required: [true, "Provide name"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export default model("category", categorySchema);
