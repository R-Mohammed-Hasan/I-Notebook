const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('./../middleware/fetchuser');


const JWT_SECRET_KEY = 'hasan';

// create a new user (sign up) - "/api/auth/create"
router.post('/create', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async(req, res) => {
    // error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Checking user email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this mail address already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        let securedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            email: req.body.email,
            password: securedPassword,
            name: req.body.name,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.status(201).json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});


// Authenticate a user using post. '/api/auth/login'

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').exists(),
], async(req, res) => {
    // error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry user does not exists " });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.status(200).json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});


// get a user by getting id from req - "/api/auth/getUser"
router.post('/getUser', fetchUser, async(req, res) => {
    try {
        console.log("Request " + JSON.stringify(req));
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
    }
});



module.exports = router;