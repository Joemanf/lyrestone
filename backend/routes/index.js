const express = require('express');
const router = express.Router();

// Test Route
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;
// router.get('/hello/world', function (req, res) {
//     console.log(`-------------------------------------------------------`, req.csrfToken)
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
// })