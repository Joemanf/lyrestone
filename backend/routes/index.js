const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/', apiRouter);

// Test Route
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;