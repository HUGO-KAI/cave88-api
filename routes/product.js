const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
//const limiter = require('../middlewares/rateLimit');
const auth = require('../middlewares/auth');
const productCtrl = require('../controllers/product');

//Définir les routes des requêtes concernant les sauces
router.get('/', productCtrl.getAllProduct);
router.post('/', auth, multer, productCtrl.createProduct);
router.get('/:id',  productCtrl.getOneProduct);
router.put('/:id', auth, multer , productCtrl.modifyProduct);
router.delete('/:id', auth, productCtrl.deleteProduct);

module.exports = router;