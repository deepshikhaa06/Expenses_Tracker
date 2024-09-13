// const asyncHandler = require('express-async-handler')
// const Category = require('../models/Category')

// const categoryController = {
//     create: asyncHandler(async (req, res) => {
//         const { name ,type}=req.body
//         if(!name ||!type){
//             throw new Error("Name and type are required")
//         }
//         const normalizedName = name.toLowerCase()
//         //*CHECK if TYPE IS VALID
//         const validTypes=["income","expense"];
//         if(!validTypes.includes(type.toLowerCase())){
//             throw new Error ("Invalid category type"+type)
//         }
//         //*CHECK IF CATEGORY ALREADY EXISTS ON THE USER
//         const existingCategory=await Category.findOne({name:normalizedName, user:req.user})
//         if(existingCategory){
//             throw new Error("Category already exists")
//         }
//         //*CREATE NEW CATEGORY
//         const newCategory=new Category({name:normalizedName, type, user:req.user})
//         await newCategory.save()
//         res.status(201).json(newCategory) 
//     }),

//     lists:asyncHandler (async (req, res)=>{
//         const categories=await Category.find({user:req.user})
//         res.status(200).json(categories)
//     }),

//     update: asyncHandler (async (req, res)=>{
//         // const categoryId=req.params
//     const { id: categoryId } = req.params;
//         const { name,type}=req.body
//         const normalizedName = name.toLowerCase()
//         const category= await Category.findById(categoryId)
//         if(!category && category.user.toString()!==req.user.toString()){
//             throw new Error ("Category not found or user not authorized")
//         }
//         const oldName=category.name;
//         //*UPDATE CATEGORY PROPERTIES
//         category.name=name
//         category.type=type
//         const updatedCategory= await category.save()
//         //*UPDATE AFFECTED TRANSACTION
//         if(oldName!==updatedCategory.name){
//             await Transaction.updateMany(
//                 {category:oldName,user:req.user},
//                 {$set:{category:updatedCategory.name}}
//             )
//         }
//         res.status(200).json(updatedCategory)
//     }),
    
//     delete: asyncHandler (async (req, res)=>{
//         const category = await Category.findById(req.params.id)
//         if(category && category.user.toString() === req.user.toString()){
//             //*UPDATE TRANSACTIONS THAT HAVE THIS CATEGORY
//             const defaultCategory = "Uncategorized"
//             await Transaction.updateMany(
//                 {category:category._id, user:req.user},{$set:{category:defaultCategory}}
//             )
//             await Category.findByIdAndDelete(req.params.id)
//             res.json({message:"Category deleted and transaction updated"})
//         }else {
//             throw new Error ("Category not found or user not authorized")
//         }
//     }),
// }

// module.exports = categoryController;

//!CHATGPT CODE this is correctly delete the item 
const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction'); // Ensure this is imported

const categoryController = {
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if (!name || !type) {
            throw new Error("Name and type are required");
        }
        const normalizedName = name.toLowerCase();
        
        // Check if type is valid
        const validTypes = ["income", "expense"];
        if (!validTypes.includes(type.toLowerCase())) {
            throw new Error("Invalid category type: " + type);
        }
        
        // Check if category already exists for the user
        const existingCategory = await Category.findOne({ name: normalizedName, user: req.user });
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        
        // Create a new category
        const newCategory = new Category({ name: normalizedName, type, user: req.user });
        await newCategory.save();
        res.status(201).json(newCategory);
    }),

    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),

    update: asyncHandler(async (req, res) => {
        const { id: categoryId } = req.params;
        const { name, type } = req.body;
        const normalizedName = name.toLowerCase();

        const category = await Category.findById(categoryId);
        if (!category || category.user.toString() !== req.user.toString()) {
            throw new Error("Category not found or user not authorized");
        }

        const oldName = category.name;
        
        // Update category properties
        category.name = name;
        category.type = type;
        const updatedCategory = await category.save();

        // Update affected transactions
        if (oldName !== updatedCategory.name) {
            await Transaction.updateMany(
                { category: oldName, user: req.user },
                { $set: { category: updatedCategory.name } }
            );
        }
        
        res.status(200).json(updatedCategory);
    }),

    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category && category.user.toString() === req.user.toString()) {
            // Update transactions that have this category
            const defaultCategory = "Uncategorized";
            await Transaction.updateMany(
                { category: category._id, user: req.user },
                { $set: { category: defaultCategory } }
            );
            
            // Delete the category
            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Category deleted and transactions updated" });
        } else {
            throw new Error("Category not found or user not authorized");
        }
    }),
};

module.exports = categoryController;
