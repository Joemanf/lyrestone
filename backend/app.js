const express = require('express');
const morgan = require('morgan'); // Used for information, very useful
const cors = require('cors'); // Cross-Origin Resource Sharing, used for 2 server communication
const csurf = require('csurf');
const helmet = require('helmet'); // Sets different http headers, like a helmet
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production'; // Sets a boolean

const app = express();

// Basic Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // cors is only used in development
    app.use(cors());
}

// Putting on my helmet
app.use(helmet({
    contentSecurityPolicy: false // React is good at mitigating Cross-Site Scripting
}));

// Setting up the _csrf token and creating req.csrfToken
app.use(
    csurf({
        cookie: {
            secure: isProduction, // True if in production
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

// THIS HAS TO GO AFTER EVERY MIDDLEWARE INCLUDING SECURITY OR IT WILL BREAK EVERYTHING!
app.use(routes); // Connect the routes

module.exports = app;