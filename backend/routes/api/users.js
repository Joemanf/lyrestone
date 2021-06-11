const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Character } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

// Sign up Validators
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/signup',
    // validateSignup,
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body; // Grab the info from the req

        const valErrs = []
        if (!email.split('').includes('@') || !email.split('').includes('.') || email.length < 1) {
            valErrs.push('Please provide a valid email.')
        }
        if (username.length < 4) {
            valErrs.push('Please provide a username with at least 4 characters.')
        }
        if (username.split('').includes('@')) {
            valErrs.push('Username cannot be an email.')
        }
        if (password.length < 6) {
            valErrs.push('Password must be 6 characters or more.')
        }
        let profileImageUrl;
        if (valErrs.length) {
            // res.status(403)
            return res.send({ valErrs })
        }
        if (req.file) {
            profileImageUrl = await singlePublicFileUpload(req.file); // Grab the image uploaded b y the user
        }
        else profileImageUrl = 'https://lyrestone.s3.amazonaws.com/lyrestone_anon_2.png';
        const user = await User.signup({ email, username, password, avatar: profileImageUrl }); // Make yourself
        await setTokenCookie(res, user);

        await Character.create({
            name: 'Eugene',
            userId: user.id,
            class: 'Explorer',
            strength: 8,
            dexterity: 7,
            constitution: 8,
            intelligence: 3,
            wisdom: 5,
            charisma: 7,
            avatar: `https://cdn.discordapp.com/attachments/661999012873764935/839327174892060697/EUGENE_shorter_neck.png`,
        })
        await Character.create({
            name: 'Frogmouth',
            userId: user.id,
            class: 'Pirate',
            strength: 5,
            dexterity: 7,
            constitution: 5,
            intelligence: 6,
            wisdom: 6,
            charisma: 8,
            avatar: 'https://cdn.discordapp.com/attachments/487051902379622421/839608831528796220/unknown.png',
        })

        return res.json({
            user,
            valErrs
        });
    }),
);

module.exports = router;