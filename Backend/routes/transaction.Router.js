const express= require('express')
const isAuthenticated = require('../middlewares/isAuth.Middlerware')
const transactionController = require('../controllers/transaction.controller')
const transactionRouter = express.Router()

//?CREATE INSTANCE OF EXPRESS ROUTER

transactionRouter.post('/api/v1/transactions/create',isAuthenticated, transactionController.create)
transactionRouter.get('/api/v1/transactions/lists',isAuthenticated, transactionController.getFilteredTransactions)
// transactionRouter.get('/api/v1/transactions/lists', isAuthenticated, (req, res, next) => {
//     console.log("GET /api/v1/transactions/lists hit");
//     next();
// }, transactionController.lists);
transactionRouter.put('/api/v1/transactions/update/:id', isAuthenticated, transactionController.update);
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuthenticated, transactionController.delete);

module.exports = transactionRouter;
