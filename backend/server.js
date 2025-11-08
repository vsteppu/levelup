import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import sequelize from "./config/db.js"
import getUser from "./routes/user.js"
import registerUser from "./routes/register.js"
import loginUser from "./routes/login.js"
import userProfile from "./routes/profile.js"
import tokenValidation from "./routes/token-validation.js"

dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5000",
        credentials: true,
    })
);
app.use(cookieParser())
app.use(express.json());

sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Database synced"))
    .catch((err) => console.error("❌ Error syncing DB:", err));

app.post("/user", getUser);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/profile", userProfile);
app.post("/token-validation", tokenValidation);

app.listen(port, () => {
    console.log(`♻️  Server run on http://localhost:${port}`);
});
