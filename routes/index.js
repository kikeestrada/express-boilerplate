const
    express = require('express'),
    router = express.Router();

router
    .get('/', (req, res, next) => res.render('index', { title: 'Home' }))
    .get('/portfolio', (req, res, next) => res.render('portfolio', { title: 'Portfolio' }))
    .get('/contact', (req, res, next) => res.render('contact', { title: 'Contact' }))

module.exports = router;