import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: Number,
    imageUrl: String,
    description: String,
    creatorId: [
      {
        type: ObjectId,
        ref: "admin",
      },
    ],
  },
  { timestamps: true }
);

const courseModel = mongoose.model("course",courseSchema);
export default courseModel ;