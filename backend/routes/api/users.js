const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

// Email Validators
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
    '/', // Realizing this might be an issue... come back to it
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        console.log('First backend hit')
        const { email, password, username } = req.body; // Grab the info from the req
        console.log('Second backend hit!!!!!!!!!!!!!!!!!!!!!', req.file)
        const profileImageUrl = await singlePublicFileUpload(req.file); // Grab the image uploaded b y the user
        console.log('Third backend hit')
        const user = await User.signup({ email, username, password, profileImageUrl }); // Make yourself
        console.log('Fourth backend hit')
        await setTokenCookie(res, user);
        console.log('Fifth backend hit')
        return res.json({
            user,
        });
    }),
);

module.exports = router;