const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Story, Scene, Choice, User, sequelize } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// Get all stories (for displaying on main page)
router.get('/', asyncHandler(async (req, res, next) => {
    const stories = await Story.findAll({
        include: User
    });
    return res.json({ stories })
}))

// Get a story (for playing)
router.get('/:storyId', asyncHandler(async (req, res, next) => {
    const storyId = req.params.storyId
    const story = await Story.findByPk(storyId, {
        include: {
            model: Scene,
        },
        order: [
            [{ model: Scene }, 'id', 'ASC'], // THIS PIECE IS VERY, VERY IMPORTANT
        ],
    })
    return res.json({ story })
}))

// Save a story to the database
// Throw in validations
router.post('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.body

    // Probably put some AWS stuff here

    const story = await Story.create({
        userId,
        title: 'My Story',
        description: 'Insert Description Here',
        thumbnail: `https://lyrestone.s3.amazonaws.com/lyrestone-dragon.png`,
        published: false,
    })


    await Scene.create({
        storyId: story.id,
        title: 'Root',
        body: 'This is the root of the story.',
        backgroundImg: null,
        root: true,
    })

    return res.json({ story })
}))

router.put('/edit/:storyId', asyncHandler(async (req, res, next) => {
    const { userId, title, description, thumbnail, published } = req.body // Might not be thumbnail
    const storyId = req.params.storyId

    //Might have to do AWS stuff here

    const story = await Story.findByPk(storyId)

    if (story) {
        await story.update({
            userId,
            title,
            description,
            thumbnail,
            published,
        })
    }

    return res.json({ story });
}))

// Delete a story
router.delete(`/delete-story`, asyncHandler(async (req, res) => {
    const { id } = req.body; // Check the ID
    const deleteStory = await Story.findByPk(id);
    if (deleteStory) {
        const deleteScenes = await Scene.findAll({
            where: { storyId: id },
            order: [['id', 'DESC']] // Might need to change
        })
        for (let i = 0; i < deleteScenes.length; i++) {
            const scene = deleteScenes[i];
            if (scene) {
                const deleteChoices = await Choice.findAll({
                    where: { nextSceneId: scene.id },
                    order: [['id', 'DESC']] // Might need to change
                })
                for (let j = 0; j < deleteChoices.length; j++) {
                    const choice = deleteChoices[j];
                    await choice.destroy()
                }
                await scene.destroy();
            }
        }

        await deleteStory.destroy()
    }
    else {
        return res.json("Story doesn't exists")
    }
}))

module.exports = router;