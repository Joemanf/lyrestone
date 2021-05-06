const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Scene, Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

router.get('/:sceneId', asyncHandler(async (req, res, next) => {
    const sceneId = req.params.sceneId
    const currentScene = await Scene.findByPk(sceneId, {
        include: Choice
    })
    return res.json({ currentScene })
}))

// router.get('/', asyncHandler(async (req, res, next) => {
//     // const userId = await getCurrentUserId(req)
//     // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userId)
//     const stories = await Story.findAll();
//     return res.json({ stories })
// }))

module.exports = router;