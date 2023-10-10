import AsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { calculateMinute } from './calculate-minute.js'

// @degs  Get user workouts
// @route GET /api/workouts
// @accces private
export const getWorkouts = AsyncHandler(async (req, res) => {
	const exercise = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})
	res.json(exercise)
})

// @degs  Get user workouts
// @route GET /api/workouts/:id
// @accces private
export const getWorkout = AsyncHandler(async (req, res) => {
	const workout = await prisma.workout.findMany({
		where: { id: +req.params.id },
		include: {
			exercises: true
		}
	})
	if (!workout) {
		res.status(404)
		throw new Error('Workout is not found')
	}
	const minutes = calculateMinute(workout[0].exercises.length)
	res.json({ ...workout[0], minutes })
})

// @degs  Post user workout
// @route post /api/workouts
// @accces private
export const createNewWorkout = AsyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})

// @degs  PUT user workouts
// @route PUT /api/workouts/:id
// @accces private
export const updateWorkout = AsyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	try {
		const update = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					connect: exerciseIds.map(id => ({ id: +id }))
				}
			}
		})
		res.json(update)
	} catch (error) {
		res.status(404)
		throw new Error('workout not found')
	}
})
// @degs  DELETE user workouts
// @route DELETE /api/workouts/:id
// @accces private
export const deleteWorkout = AsyncHandler(async (req, res) => {
	try {
		const deleteWorkout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({ message: 'workout deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('workout not found')
	}
})
