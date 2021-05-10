const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Character } = require('../../db/models')
const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    const userId = await getCurrentUserId(req)
    console.log(userId, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const characters = await Character.findAll({
        where: { userId } // Untested as of 5/5/21
    });
    console.log('Characters????????????', characters)
    return res.json({ characters })
}))

module.exports = router;