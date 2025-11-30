const express = require('express');
const router = express.Router();
const {requireAuth} =  require('../middlewares/auth');

const usuarioController = require('../controllers/usuarioController');
//usuario-registro
router.post('/register',usuarioController.register);
router.post('/login',usuarioController.login);
router.get("/welcome",requireAuth, usuarioController.welcome);
module.exports = router;