import { Schema, model, models } from "mongoose";

const filesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
    },
    description: {
      type: String,
      required: [true, "The description is required"],
    },
    fileUrl: {
      type: String,
      required: [true, "The fileUrl is required"],
    },
  },
  {
    collection: "products",
  }
);

const Files = models.products || model("products", filesSchema);

export default Files;