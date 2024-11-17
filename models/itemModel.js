const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['character', 'creature', 'potion'] }, // Тип элемента
    title: { type: String, required: true }, // Название
    description: { type: String, required: true }, // Описание
    images: [{ type: String }], // Ссылки на изображения
    createdAt: { type: Date, default: Date.now }, // Дата создания
    updatedAt: { type: Date }, // Дата обновления
});

itemSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Item', itemSchema);
