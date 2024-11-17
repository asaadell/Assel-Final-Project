const Item = require('../models/itemModel');

// Получение всех элементов заданного типа
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find({ type: req.params.type });
        res.render('items', { title: `Manage ${req.params.type}`, items, type: req.params.type });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.render('error', { message: 'Error fetching items', error });
    }
};

/*
// Создать новый элемент
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item({
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            images: req.body.images, // Принимаем массив ссылок на изображения
        });
        await newItem.save();
        res.redirect(`/${req.body.type}`);
    } catch (error) {
        res.status(500).send('Error creating item.');
    }
};
*/

// Создать новый элемент с проверкой данных
exports.createItem = async (req, res) => {
    try {
        const { type, title, description, images } = req.body;

        // Проверка данных
        if (!type || !title || !description || !images) {
            return res.status(400).send('All fields are required.');
        }

        const imageArray = images.split(',').map((img) => img.trim());
        if (imageArray.length < 1) {
            return res.status(400).send('At least one image is required.');
        }

        const newItem = new Item({ type, title, description, images: imageArray });
        await newItem.save();
        res.redirect(`/${type}`);
    } catch (error) {
        res.status(500).send('Error creating item.');
    }
};


// Удалить элемент
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect(`/${req.params.type}`);
    } catch (error) {
        res.status(500).send('Error deleting item.');
    }
};

// Обновить элемент
exports.updateItem = async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
        });
        res.redirect(`/${req.body.type}`);
    } catch (error) {
        res.status(500).send('Error updating item.');
    }
};

// Уведомление при создании элемента
exports.createItem = async (req, res) => {
    try {
        const { type, title, description, images } = req.body;

        const newItem = new Item({
            type,
            title,
            description,
            images: images.split(',').map(img => img.trim()),
        });
        await newItem.save();

        // Уведомление
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.user.username,
            subject: 'New Item Created',
            text: `You created a new ${type}: ${title}`,
        });

        res.redirect(`/${type}`);
    } catch (error) {
        res.status(500).send('Error creating item.');
    }
};

// Уведомление при удалении элемента
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        // Уведомление
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.user.username,
            subject: 'Item Deleted',
            text: `You deleted the ${item.type}: ${item.title}`,
        });

        res.redirect(`/${req.params.type}`);
    } catch (error) {
        res.status(500).send('Error deleting item.');
    }
};


exports.getCharacters = (req, res) => {
    const posts = [
        { title: 'Harry Potter', description: 'The Boy Who Lived, a brave and loyal friend.' },
        { title: 'Hermione Granger', description: 'Brightest witch of her age and an avid reader.' },
        { title: 'Ron Weasley', description: 'A loyal friend with a big heart.' }
    ];
    res.render('characters', { title: 'Characters', posts });
};

exports.getCreatures = (req, res) => {
    const posts = [
        { title: 'Hippogriff', description: 'A majestic creature with the body of a horse and the wings of an eagle.' },
        { title: 'Phoenix', description: 'A bird that can regenerate from its own ashes.' },
        { title: 'Thestral', description: 'Winged horses that can only be seen by those who have witnessed death.' }
    ];
    res.render('creatures', { title: 'Magical Creatures', posts });
};

exports.getPotions = (req, res) => {
    const posts = [
        { title: 'Polyjuice Potion', description: 'Allows the drinker to take the form of another person.' },
        { title: 'Felix Felicis', description: 'Grants the drinker a period of good luck.' },
        { title: 'Veritaserum', description: 'A truth serum that forces the drinker to tell the truth.' }
    ];
    res.render('potions', { title: 'Potions', posts });
};
