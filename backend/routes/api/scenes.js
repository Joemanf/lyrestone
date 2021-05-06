const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Story, Scene } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// router.get('/', asyncHandler(async (req, res, next) => {
//     // const userId = await getCurrentUserId(req)
//     // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userId)
//     const stories = await Story.findAll();
//     return res.json({ stories })
// }))

module.exports = router;