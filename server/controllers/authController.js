const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user')
router.post('/signup', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
                status: 'failed'
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        const token = jwt.sign({
            userId: newUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        // console.log(token);
        res.status(201).json({
            message: 'User created successfully',
            success: true,
            token: token,
            data: newUser
        });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Internal Server Error',
                error: error.message
            });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email', success: false, });
        }
        // To check the password is comming with the user or not???
        // console.log(user); 
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(200).json({
            message: 'Login successful',
            success: true,
            token: token,
            data: user
        });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Internal Server Error',
                error: error.message
            });
    }
})

module.exports = router;
