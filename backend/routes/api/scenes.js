const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Scene, Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// Get all scenes associated with a story (for making a story)
router.get('/:storyId', asyncHandler(async (req, res, next) => {
    const storyId = req.params.storyId;
    const allScenes = await Scene.findAll({
        where: storyId
    })
    return res.json({ allScenes })
}))

// Save a scene
// Don't forget to throw in validations
router.post('/', asyncHandler(async (req, res, next) => {
    const { title, body, backgroundImg } = req.body // might not be background image here

    // Probably put some AWS stuff here

    const scene = await Scene.create({
        title,
        body,
        backgroundImg
    })

    return res.json({ scene });
}))

// Edit a scene
// Throw validators in here
router.put('/:id', asyncHandler(async (req, res, next) => {
    const { title, body, backgroundImg } = req.body // might not be background image here
    const sceneId = req.params.id

    const scene = await Scene.findByPk(sceneId)

    await scene.update({
        title,
        body,
        backgroundImg
    })

    return res.json({ scene });
}))

// router.put('/users/:userId', (req, res) => {
//     const user = getUser(req.params.userId)

//     if (!user) return res.status(404).json({})

//     user.name = req.body.name
//     res.json(user)
// })

// Delete a scene
router.delete(`/delete-scene`, asyncHandler(async (req, res) => {
    const { id } = req.body; // Check the ID
    const deleteScene = await Scene.findByPk(id);
    if (deleteScene) {
        const deleteChoices = await Choice.findAll({
            where: { sceneId: id }
        })
        deleteChoices.forEach(async choice => await choice.destroy())
        await deleteScene.destroy();
        return res.json(`Deleted`);
    } else {
        return res.json("Scene doesn't exists")
    }
}))

module.exports = router;