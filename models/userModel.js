const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'editor'], default: 'editor' }, // Роли пользователей
    firstName: { type: String, required: true }, // Имя
    lastName: { type: String, required: true },  // Фамилия
    age: { type: Number, required: true },       // Возраст
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] }, // Пол
    twoFactorSecret: { type: String },           // Секрет для двухфакторной аутентификации
    createdAt: { type: Date, default: Date.now }, // Дата создания
});

// Хэширование пароля перед сохранением
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
