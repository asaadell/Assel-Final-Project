const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Страницы
router.get('/register', (req, res) => {
    res.render('register', { 
        title: 'Register',
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    });
});

router.get('/login', (req, res) => {
    res.render('login', { 
        title: 'Login',
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    });
});


// Действия
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
