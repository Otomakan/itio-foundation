import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'
import corsOptions from './config/corsOptions'
import router from './router'
import { authorizeUser } from './session/authentificator'

// The request handler must be the first middleware on the app
const app = express()
app.set('port', process.env.PORT || 4000)
app.use(cookieParser())

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/health', (req, res) => res.status(200).end()) // TODO: Temporary solution, implement health check route

// This is for the secure cookie option and pass the LB
app.set('trust proxy', 1)

/**
 * Authentification management
 */
app.use(passport.initialize())

app.use(authorizeUser)


/**
 * Main route
*/

app.use('/api', router)

export default app
