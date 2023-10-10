import cors from 'cors'
import path from 'path'
import colors from 'colors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import router from './app/auth/auth.routes.js'
import exerciseRouter from './app/exercise/exercise.routes.js'
import { errorHandler, notFound } from './app/middleware/error.midleware.js'
import { prisma } from './app/prisma.js'
import userRouter from './app/user/user.routes.js'
import workoutRouter from './app/workout/workout.routes.js'

const app = express()
const PORT = process.env.PORT || 5000

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
	app.use(cors())
	app.use(express.json())
	const __dirname = path.resolve()
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))
	app.use(express.urlencoded({ extended: false }))

	app.use('/api/auth', router)
	app.use('/api/exercises', exerciseRouter)
	app.use('/api/users', userRouter)
	app.use('/api/workouts', workoutRouter)

	app.use(notFound)
	app.use(errorHandler)
	app.listen(
		PORT,
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
				.bold
		)
	)
}
main()
	.then(async e => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
