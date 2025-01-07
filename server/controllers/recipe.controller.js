import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, tags } = req.body;

    try {
        // Use the authenticated user's ID as the author
        const authorId = req.user?._id; // Ensure middleware adds `req.user`

        if (!authorId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Author information is missing",
            });
        }

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            tags,
            author: authorId,
        });

        res.status(201).json({
            success: true,
            message: "Recipe created successfully",
            data: recipe,
        });
    } catch (error) {
        console.error("Error creating recipe:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while creating recipe",
        });
    }
};

export const getRecipe = async (req, res) => {
    const { id } = req.params; // Get the recipe ID from the URL params

    try {
        if (id) {
            // Fetch a single recipe by ID
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                return res.status(404).json({
                    success: false,
                    message: "Recipe not found",
                });
            }

            res.status(200).json({
                success: true,
                data: recipe,
            });
        } else {
            // Fetch all recipes
            const recipes = await Recipe.find();

            res.status(200).json({
                success: true,
                data: recipes,
            });
        }
    } catch (error) {
        console.error("Error fetching recipe:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching recipe",
        });
    }
};

export const  editRecipe = async(req,res)=>{
const {id}= req.params;
const updatedData= req.body;

try {
    //check if it exists
    const recipe = await Recipe.findById(id);

    if(!recipe)
    {
        return res.status(404).json({
            success:false,
            message:"Recipe not found"
        });
    }

    //update the new recepie with data
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
    });
    res.status(200).json({
        success:true,
        message:"Recipe updated Successfully",
        data:updatedRecipe
    })
} catch (error) {
    console.error("Error updating recipe:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while updating recipe",
            error: error.message,
        });
}
}
export const deleteRecipe = async(req,res)=>{
    const {id}= req.params;
    try {
        const recipe= await Recipe.findById(id);
        if(!recipe)
        {
            return res.status(404).json({
                success:false,
                message:"Recope not found"
            });
        }

        // delte the receipe
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Recipe Deleted Successfully"
        })
        
    } catch (error) {
        console.error("Error deleting recipe:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while deleting recipe",
            error: error.message,
        });
    }
}