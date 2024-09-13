const asyncHandler = require('express-async-handler')
const Transaction = require('../models/Transaction');

const transactionController={
    create: asyncHandler(async (req, res) => {
        const { type,category,amount,date,description}=req.body;
        if(!amount||!type ||!date){
            throw new Error("Type,amount,date are required")
        }
        const newTransaction=await Transaction.create({ user:req.user,type,category,amount,description})
        res.json(newTransaction)
    }),

    getFilteredTransactions: asyncHandler(async(req,res)=>{
        const {startDate,endDate,type,category}=req.query
        let filters={user:req.user}
        if(startDate){
            filters.date={"$gte":new Date(startDate)}
        }
        if(endDate){
            filters.date={"$lte":new Date(endDate)}
        }
        if(type){
            filters.type=type
        }
        if(category){
        if(category==="All"){
            //*NO CATEGORY FILTER NEEDED WHEN FILLTERING FOR ALL
        }else if(category==="Uncategorized"){
            filters.category="Uncategorized"
        }else{
            filters.category=category
        }
    }
    const transactions=await Transaction.find(filters).sort({date:-1})
    res.json(transactions)
    }),

    update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    console.log("Transaction",transaction);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      (transaction.type = req.body.type || transaction.type),
        (transaction.category = req.body.category || transaction.category),
        (transaction.amount = req.body.amount || transaction.amount),
        (transaction.date = req.body.date || transaction.date),
        (transaction.description = req.body.description || transaction.description)
        const updatedTransaction = await transaction.save();
        console.log('Transaction updated successfully:', updatedTransaction);
      res.json(updatedTransaction);
      
    }
    }),//THIS UPDATE CAN ALSO BE WRITTEN AS FINDBYIDANDUPDATE

    delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id)
      console.log('Transaction deleted successfully');
    res.json({ message: 'Transaction deleted successfully' });
    }
    }),

    
}

module.exports=transactionController;