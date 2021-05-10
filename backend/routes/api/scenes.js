const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Scene, Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// Get the current scene
router.get('/:sceneId', asyncHandler(async (req, res, next) => {
    const sceneId = req.params.sceneId;
    const currentScene = await Scene.findByPk(sceneId, {
        include: Choice
    })
    return res.json({ currentScene })
}))

// Get all scenes associated with a story (for making a story)
router.get('/:storyId/:sceneId', asyncHandler(async (req, res, next) => {
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
router.put('/edit/:id', asyncHandler(async (req, res, next) => {
    const { title, body, backgroundImg } = req.body // might not be background image here
    const sceneId = req.params.id

    const scene = await Scene.findByPk(sceneId)

    // AWS stuff here?

    await scene.update({
        title,
        body,
        backgroundImg
    })

    return res.json({ scene });
}))

// Delete a scene
router.delete(`/delete-scene`, asyncHandler(async (req, res) => {
    const { id } = req.body; // Check the ID
    const deleteScene = await Scene.findByPk(id);
    if (deleteScene.root) {
        return res.json("Cannot delete root scene")
    }
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