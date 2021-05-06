const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Story, Scene, Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    // const userId = await getCurrentUserId(req)
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userId)
    const stories = await Story.findAll();
    return res.json({ stories })
}))

router.get('/:storyId', asyncHandler(async (req, res, next) => {
    const storyId = req.params.storyId
    const story = await Story.findByPk(storyId, {
        include: {
            model: Scene,
            include: Choice
        },
    })
    return res.json({ story })
}))

module.exports = router;