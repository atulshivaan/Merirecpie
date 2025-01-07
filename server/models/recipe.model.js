import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        ingredients: {
            type: [String],
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
        },
        author: {
            type:mongoose.Types.ObjectId, ref:"User"
        },
        ratings: [
            {
                user: { type: mongoose.Types.ObjectId, ref: "User" },
                rating: { type: Number, required: true },
            },
        ],
        comments: [
            {
                user: { type: mongoose.Types.ObjectId, ref: "User" },
                comment: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
