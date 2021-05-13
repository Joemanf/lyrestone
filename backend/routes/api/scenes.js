const express = require('express');
const asyncHandler = require('express-async-handler'); // Will wrap async route handlers and custom middlewares

const { Scene, Choice } = require('../../db/models')
// const { getCurrentUserId } = require('../../utils/auth');

const router = express.Router();

// Get the current scene
router.get('/:sceneId', asyncHandler(async (req, res, next) => {
    const sceneId = req.params.sceneId;
    const currentScene = await Scene.findByPk(sceneId, {
        include: Choice,
        order: [
            ['id', 'ASC'], // THIS PIECE IS VERY, VERY IMPORTANT
        ],
        // order: ['createdAt']
    })
    return res.json({ currentScene })
}))

// Grab the parent(s) Choice(es)
router.get('/parent/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const parentChoices = await Choice.findAll({
        where: { nextSceneId: id }
        // if the scene is "Into the Lair (15)", it will find
        // all choices where the next scene id is 15, thus
        // giving access to all scenes associated with it through
        // sceneId (such as 11, 12, 13, 14)
    })
    return res.json({ parentChoices })
}))

// Grab the parents via their choices (it's a post to get access to req.body)
router.post('/parent', asyncHandler(async (req, res, next) => {
    const { sent } = req.body
    if (!sent) {
        return res.json({ parentScenes: [] })
    }
    const parentScenes = []
    const scene = await Scene.findByPk(sent.sceneId, {
        include: Choice
    })
    parentScenes.push(scene)
    return res.json({ parentScenes })
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
router.post('/:currentSceneId', asyncHandler(async (req, res, next) => {
    // const { title, body, backgroundImg } = req.body // might not be background image here

    // Probably put some AWS stuff here

    const currentSceneId = req.params.currentSceneId

    const scene = await Scene.create({
        storyId: req.body.storyId,
        title: 'New Scene',
        body: 'This is a new scene',
        backgroundImg: null
    })

    await Choice.create({
        body: scene.title, // Should be the same as title of new scene
        sceneId: currentSceneId, // Should be the current scene's ID
        nextSceneId: scene.id, // Will be the id of the scene just created, because if choices are empty that's game over
        isWinning: false, // false
        killsPlayer: false, // false
        conditionals: '111111', // 111111
        changeHealth: 0, // 0
    })

    return res.json({ scene });
}))

// Edit a scene
// Throw validators in here
router.put('/edit/:sceneId/:choiceId', asyncHandler(async (req, res, next) => {
    const {
        root,
        title,
        body,
        backgroundImg,
        victory,
        kill,
        health,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
    } = req.body.newValidated // might not be background image here
    const sceneId = req.params.sceneId
    const choiceId = req.params.choiceId

    let parentScene;
    if (choiceId) {
        parentScene = await Scene.findByPk(choiceId, {
            include: Choice
        })
    }

    const scene = await Scene.findByPk(sceneId)

    // const choice = parentScene.Choices[scene.id]
    let realChoice;
    if (parentScene) {
        parentScene.Choices.forEach(choice => {
            if (parseInt(choice.nextSceneId) === parseInt(sceneId)) { // check this, it's suppose to be the parent's next scene
                realChoice = choice
            }
        })
    }

    // AWS stuff here?

    const sceneObj = {}

    if (title !== undefined) {
        sceneObj.title = title
    }

    if (body !== undefined) {
        sceneObj.body = body
    }

    if (backgroundImg !== undefined) {
        sceneObj.backgroundImg = backgroundImg
    }

    // let choice;
    if (root) {
        await scene.update(sceneObj)
    }
    else {
        await scene.update(sceneObj)
        // choice = await Choice.findByPk(choiceId)
        const choiceObj = {};
        if (title !== undefined) {
            choiceObj.body = title
        }
        if (sceneId) {
            choiceObj.sceneId = sceneId
        }
        if (realChoice && realChoice.id) {
            choiceObj.nextSceneId = realChoice.id
        }
        //find out sceneId and nextSceneId (probably the params)
        if (victory !== undefined) {
            choiceObj.isWinning = victory
        }
        if (kill !== undefined) {
            choiceObj.killsPlayer = kill
        }
        if (health !== undefined) {
            choiceObj.changeHealth = health
        }
        let conditionalsString = '';
        if (strength !== undefined) {
            conditionalsString += strength.toString();
        }
        else (conditionalsString += '1')
        if (dexterity !== undefined) {
            conditionalsString += dexterity.toString();
        }
        else (conditionalsString += '1')
        if (constitution !== undefined) {
            conditionalsString += constitution.toString();
        }
        else (conditionalsString += '1')
        if (intelligence !== undefined) {
            conditionalsString += intelligence.toString();
        }
        else (conditionalsString += '1')
        if (wisdom !== undefined) {
            conditionalsString += wisdom.toString();
        }
        else (conditionalsString += '1')
        if (charisma !== undefined) {
            conditionalsString += charisma.toString();
        }
        else (conditionalsString += '1')
        choiceObj.conditionals = conditionalsString
        await realChoice.update(choiceObj)
    }

    const currentScene = await Scene.findByPk(scene.id, {
        include: Choice
    })

    return res.json({ currentScene });
}))

// Delete a scene
router.delete(`/delete-scene`, asyncHandler(async (req, res) => {
    const { id } = req.body; // Check the ID
    const deleteScene = await Scene.findByPk(id, {
        order: [['createdAt', 'DESC']] // might need to change
    });
    if (deleteScene.root) {
        return res.json("Cannot delete root scene")
    }
    if (deleteScene) {
        const deleteChoices = await Choice.findAll({
            where: { nextSceneId: id }, // Grab the scene 
            order: [['createdAt', 'DESC']] // might need to change
        })
        const parent = await Scene.findByPk(parseInt(deleteChoices[0].sceneId), {
            include: Choice
        })
        deleteChoices.forEach(async choice => await choice.destroy())
        await deleteScene.destroy();
        return res.json({ parent });
    } else {
        return res.json("Scene doesn't exists")
    }
}))

module.exports = router;