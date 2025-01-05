import { model, Schema, ObjectId } from "mongoose";

const subCategorySchema = new Schema(
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
    category: [
      {
        type: ObjectId,
        ref: "category",
      },
    ],
  },
  { timestamps: true }
);

export default model("subcategory", subCategorySchema);
