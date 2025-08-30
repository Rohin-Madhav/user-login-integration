const router = require('express').Router()
const bcrypt = require('bcrypt')
const auth = require("../middileware/authMiddilware")
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
   } catch (err) {
  console.error("Register error:", err);
  res.status(500).json({ message: 'Server error' });
}

});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // Compare password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/protected",auth,(req,res)=>{
    res.send("Hone page")
})

module.exports = router