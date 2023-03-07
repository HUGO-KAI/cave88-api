const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/rateLimit');
//const passwordValidator = require ('../middleware/password');
//const emailValidator = require ('../middleware/email')
const userCtrl = require('../controllers/user');

//Définir les routes des requêtes concernant les utilisateurs
router.post('/login', limiter, userCtrl.login);

module.exports = router;