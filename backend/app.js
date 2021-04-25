const express = require('express');
const morgan = require('morgan'); // Used for information, very useful
const cors = require('cors'); // Cross-Origin Resource Sharing, used for 2 server communication
const csurf = require('csurf');
const helmet = require('helmet'); // Sets different http headers, like a helmet
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

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

// Error Handling
// For 404
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// For Sequelize Errors
app.use((err, _req, _res, next) => {
    //check if the error is a Sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    // Else, just keep on chugging
    next(err);
})

// For Something Weird...
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;


