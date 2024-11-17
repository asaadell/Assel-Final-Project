const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { isAdmin, isEditor } = require('../middleware/authMiddleware');

router.post('/create', isEditor, mainController.createItem);
router.post('/delete', isAdmin, mainController.deleteItem);


// Просмотр элементов
router.get('/:type(characters|creatures|potions)', mainController.getItems);

// Создание (только для редакторов и админов)
router.post('/:type(characters|creatures|potions)/create', isEditor, mainController.createItem);

// Удаление (только для админов)
router.post('/:type(characters|creatures|potions)/delete/:id', isAdmin, mainController.deleteItem);

// Обновление (только для админов)
router.post('/:type(characters|creatures|potions)/update/:id', isAdmin, mainController.updateItem);

const axios = require('axios');

// Главная страница
router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Harry Potter World' });
});

// Страница с фильмами
router.get('/movies', async (req, res) => {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=Harry Potter&apikey=${process.env.OMDB_API_KEY}`);
        if (response.data.Response === "True") {
            const movies = response.data.Search;
            res.render('movies', { title: 'Harry Potter Movies', movies });
        } else {
            res.render('error', { 
                message: 'Error fetching movies: ' + response.data.Error, 
                error: {} 
            });
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.render('error', { message: 'Error fetching movies.', error });
    }
});


/*router.get('/movies', async (req, res) => {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=Harry Potter&apikey=${process.env.OMDB_API_KEY}`);
        const movies = response.data.Search;
        res.render('movies', { title: 'Harry Potter Movies', movies });
    } catch (error) {
        res.status(500).send('Error fetching movies.');
    }
});*/

// Страница с погодой
router.get('/weather', async (req, res) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Scotland`);
        const weather = response.data;
        res.render('weather', { title: 'Hogwarts Weather', weather });
    } catch (error) {
        res.status(500).send('Error fetching weather.');
    }
});

router.get('/characters', mainController.getCharacters);
router.get('/creatures', mainController.getCreatures);
router.get('/potions', mainController.getPotions);

module.exports = router;
