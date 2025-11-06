import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
const secret = process.env.TURNSTILE_SECRET_KEY;

router.post("/login", async (req, res) => {
    const { email, password, token } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) {
            res.status(404).json({ message: "Not found" });
            return;
        }

        const storedPasword = existingUser?.dataValues?.password;

        const passwordPassed = await bcrypt.compare(password, storedPasword);
        if (!passwordPassed) throw new Error("Invalid password");

        if (!token) {
            return res
                .status(400)
                .json({ success: false, message: "No token provided" });
        }

        // Turnstile token validation
        const tokenValidated = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${secret}&response=${token}`,
            }
        );

        const data = await tokenValidated.json();

        if (!data.success) {
            return res.status(403).json({
                success: false,
                message: "Turnstile validation failed",
            });
        }

        const successfulLogin =
            existingUser && passwordPassed && tokenValidated && data.success;

        if (successfulLogin) {
            res.status(200).json({
                user: existingUser,
                success: true,
                message: "Login successful",
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
