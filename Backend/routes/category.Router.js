const express=require('express');
const isAuthenticated = require('../middlewares/isAuth.Middlerware');
const categoryController = require('../controllers/category.controller');
const categoryRouter=express.Router();

//?CREATE INSTANCE OF EXPRESS ROUTER

categoryRouter.post('/api/v1/categories/create', isAuthenticated,categoryController.create);
categoryRouter.get('/api/v1/categories/lists', isAuthenticated,categoryController.lists);
categoryRouter.put('/api/v1/categories/update/:id',isAuthenticated,categoryController.update);
categoryRouter.delete('/api/v1/categories/delete/:id',isAuthenticated,categoryController.delete);

module.exports =categoryRouter;