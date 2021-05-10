const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// Create a choice (in conjunction with scene create)
// Throw any validations in here
router.post('/:storyId', asyncHandler(async (req, res, next) => {
    const { body, sceneId, nextSceneId, isWinning, killsPlayer, conditionals, changeHealth } = req.body

    const choice = await Choice.create({
        body,
        sceneId,
        nextSceneId,
        isWinning,
        killsPlayer,
        conditionals,
        changeHealth,
    })

    return res.json({ choice });
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
    const {
        body,
        sceneId,
        nextSceneId,
        isWinning,
        killsPlayer,
        conditionals,
        changeHealth,
    } = req.body

    const choiceId = req.params.id

    const choice = await Choice.findByPk(choiceId)

    await choice.update({
        body,
        sceneId,
        nextSceneId,
        isWinning,
        killsPlayer,
        conditionals,
        changeHealth,
    })

    return res.json({ choice });
}))

module.exports = router;