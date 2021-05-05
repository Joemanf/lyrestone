const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Character } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    const characters = await Character.findAll({
        where: { userId } // WORKING HERE
    });
    return res.json({ characters })
}))

module.exports = router;