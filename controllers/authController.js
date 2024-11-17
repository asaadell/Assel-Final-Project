const bcrypt = require('bcrypt'); // Добавляем этот импорт
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

//Добавьте проверку и логирование перед вызовом sendWelcomeEmail:
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, username, password, role } = req.body;

        if (!username) {
            throw new Error('Username (email) is required.');
        }

        // Генерация секрета для 2FA
        const secret = speakeasy.generateSecret({ name: `HarryPotterApp (${username})` });

        // Сохранение пользователя в базу данных
        const user = new User({
            firstName,
            lastName,
            age,
            gender,
            username,
            password,
            role,
            twoFactorSecret: secret.base32,
        });
        await user.save();

        // Логирование email для отладки
        console.log('Sending welcome email to:', username);

        // Отправка приветственного письма
        await sendWelcomeEmail(username, firstName);

        // Генерация QR-кода для 2FA
        qrcode.toDataURL(secret.otpauth_url, (err, data) => {
            if (err) throw err;
            res.render('2fa', { qrcode: data, title: 'Two-Factor Authentication' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('error', { message: 'Error during registration', error });
    }
};


// Отправка приветственного письма
async function sendWelcomeEmail(email, firstName) {
    if (!email) {
        throw new Error('Email is required to send a welcome message.');
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER, // Отправитель
        to: email,                    // Получатель
        subject: 'Welcome to Harry Potter World!',
        text: `Hi ${firstName}, welcome to the magical world of Harry Potter!`,
    });
}


// Регистрация
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, username, password, role } = req.body;

        // Генерация секрета для 2FA
        const secret = speakeasy.generateSecret({ name: `HarryPotterApp (${username})` });

        // Сохранение пользователя в базу данных
        const user = new User({
            firstName,
            lastName,
            age,
            gender,
            username,
            password, // Пароли хэшируются в модели
            role,
            twoFactorSecret: secret.base32,
        });
        await user.save();

        // Отправка приветственного письма
        await sendWelcomeEmail(username, firstName);

        // Генерация QR-кода для 2FA
        qrcode.toDataURL(secret.otpauth_url, (err, data) => {
            if (err) throw err;
            res.render('2fa', { qrcode: data, title: 'Two-Factor Authentication' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('error', { message: 'Error during registration', error });
    }
};

// Логин
exports.login = async (req, res) => {
    try {
        const { username, password, token } = req.body;

        // Поиск пользователя
        const user = await User.findOne({ username });
        if (!user) {
            req.flash('error_msg', 'Invalid username or password.');
            return res.redirect('/auth/login');
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password); // bcrypt используется здесь
        if (!isPasswordValid) {
            req.flash('error_msg', 'Invalid username or password.');
            return res.redirect('/auth/login');
        }

        // Проверка токена 2FA
        const isValidToken = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
        });

        if (!isValidToken) {
            req.flash('error_msg', 'Invalid two-factor authentication token.');
            return res.redirect('/auth/login');
        }

        console.log('Request body:', req.body);
        console.log('Found user:', user);
        console.log('Password check:', isPasswordValid);


        // Успешный вход
        req.session.user = user;
        req.flash('success_msg', 'You are now logged in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.render('error', { message: 'Error during login', error });
    }
};

// Логаут
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.render('error', { message: 'Error during logout', error: err });
        } else {
            res.redirect('/auth/login');
        }
    });
};
