const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
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
        if (!email.split('').includes('@') && !email.split('').includes('.') && email.length < 1) {
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
            return res.json({ valErrs })
        }
        if (req.file) {
            profileImageUrl = await singlePublicFileUpload(req.file); // Grab the image uploaded b y the user
        }
        else profileImageUrl = 'https://lyrestone.s3.amazonaws.com/lyrestone_anon.png';
        console.log('profileImageUrl!!!!!!!!!!!!!!!!!', profileImageUrl)
        const user = await User.signup({ email, username, password, avatar: profileImageUrl }); // Make yourself
        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

module.exports = router;