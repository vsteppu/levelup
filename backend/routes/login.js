import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        const storedPasword = existingUser.dataValues.password

        bcrypt.compare(password, storedPasword, (err, result) => {
            if (err) throw err;

            if (result) {
                res.status(200).json(existingUser);
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
