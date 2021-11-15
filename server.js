import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

// Config
import { DEVELOPMENT } from './config/constants.js'
import { connectDB } from './config/db.js'

// Middleware
import { notFound } from './middleware/errorMiddleware.js'
import authJwt from './helpers/jwt.js'
import errorHandler from './helpers/error-handler.js'

// Routes
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
app.use(
	'/public/uploads',
	express.static(path.join(__dirname, '/public/uploads'))
)

if (process.env.NODE_ENV === DEVELOPMENT) app.use(morgan('dev'))

app.use(cors())
app.options('*', cors())

app.use(notFound)
app.use(errorHandler)
app.use(authJwt())

const PORT = process.env.PORT || 5000

// app.listen(
// 	PORT,
// 	console.log(
// 		`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
// 	)
// )

let server = app.listen(PORT, () => {
	let port = server.address().port
	console.log(`Server running is production mode on port ${port}`.yellow.bold)
})
