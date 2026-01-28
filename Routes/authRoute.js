const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControllers');
const auth = require('../middlewares/authmiddleware');

router.post('/signup', authController.signup);
router.post('/login',authController.login);
router.post('/forgetpassword',authController.forgetPassword);
router.post('/resetpassword',authController.resetPassword);
router.post('/logout',auth,authController.logout);
router.get('/get-all-users',authController.Getusers);
module.exports = router;
