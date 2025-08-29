const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Register a new user (Admin or Student)
 * @route   POST /api/auth/register
 * @access  Public (for initial setup)
 */
exports.register = async (req, res) => {
    const { name, rollNo, password, role } = req.body;

    try {
        // Check if user with this Roll No already exists
        let user = await User.findOne({ rollNo });
        if (user) {
            return res.status(400).json({ msg: 'User with this Roll No already exists' });
        }

        // Create a new user instance
        user = new User({
            name,
            rollNo,
            password,
            role,
        });

        // Save the user to the database (password will be hashed by the pre-save hook in the model)
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

/**
 * @desc    Login user & get a JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    const { rollNo, password } = req.body;

    try {
        // Check if a user with the given Roll No exists
        const user = await User.findOne({ rollNo });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create the JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
            },
        };

        // Sign the token and send it back to the client
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};