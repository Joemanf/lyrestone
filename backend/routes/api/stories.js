const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Story } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    const stories = await Story.findAll();
    return res.json({ stories })
}))

module.exports = router;