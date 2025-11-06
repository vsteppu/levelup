import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import getUser from '../backend/routes/user.js'
import registerUser from '../backend/routes/register.js'
import loginUser from '../backend/routes/login.js'
import tokenValidation from '../backend/routes/token-validation.js'

dotenv.config()

const port = process.env.PORT || 9000

const app = express()

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

app.use(express.json())

app.post('/user', getUser)
app.post('/register', registerUser)
app.post('/login', loginUser)
app.post('/token-validation', tokenValidation)

app.listen(port, () => {console.log(`♻️  Server run on http://localhost:${port}`)})