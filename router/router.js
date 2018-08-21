var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../controller/auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
global.__root   = __dirname + '/'; 

var AuthController = require(__root + '../controller/auth/AuthController');

router.post('/authenticate', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout', AuthController.logout);
router.get('/me', VerifyToken, AuthController.me);

module.exports = router;