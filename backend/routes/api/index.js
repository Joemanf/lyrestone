const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storiesRouter = require('./stories.js');
const charactersRouter = require('./characters.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/stories', storiesRouter);

router.use('/characters', charactersRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router