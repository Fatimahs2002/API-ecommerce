
module.exports = app => {
     const addcategory = require('../controllers/category.controller');
   const getCategories=require('../controllers/category.controller');
   const updateCategory=require('../controllers/category.controller');
     const router = require('express').Router();
   
     router.post('/add', addcategory.addCategory); // Corrected method and object
   router.get('/read',getCategories.getCategories);
   router.put('/update:id',updateCategory.updateCategory);
     app.use('/api/category', router);
   };
   