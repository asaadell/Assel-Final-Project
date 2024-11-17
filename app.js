require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db'); // Подключаем MongoDB
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();


// Порты
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.user; // true, если пользователь авторизован
    res.locals.user = req.session.user || null;     // информация о пользователе или null
    next();
});*/


// Настройка сессий
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // Убедитесь, что SESSION_SECRET задан в .env
    resave: false,
    saveUninitialized: true,
}));

// Настройка Flash-сообщений
app.use(flash());

// Передача Flash-сообщений в шаблоны
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // Используем connect-flash
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Роуты
app.use('/', require('./routes/main')); // Основные маршруты
app.use('/auth', require('./routes/auth')); // Маршруты аутентификации

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//общий обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        message: err.message || 'An unexpected error occurred',
        error: err
    });
});
