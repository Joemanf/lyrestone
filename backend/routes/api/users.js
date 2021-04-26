const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '',
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body; // Grab the info from the req
        const user = await User.signup({ email, username, password }); // Make yourself

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

module.exports = router;