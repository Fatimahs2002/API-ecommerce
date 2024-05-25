module.exports = app => {
     const users = require('../controllers/user.controller');
     const isAuthenticated  = require('../middleware/auth');
     const router = require('express').Router();
   
     // Register endpoint
     router.post('/register', users.register);
   router.post('/login',users.login)
     // Switch to admin endpoint
     router.put('/switchAdmin/:ID',isAuthenticated(['admin']), users.switchToAdmin);
     router.delete('/deleteadmin/:ID',isAuthenticated(['admin']),users.deleteAdmin);
     router.put('/updateadmin/:ID',isAuthenticated(['admin']),users.updateAdmin);
     app.use('/api/users', router);
   };
   
