import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @degs  PUT exercise log time
// @route PUT /api/exercises/log/time/:id
// @accces Private

export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body
	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})
		res.json(exerciseLogTime)
	} catch (e) {
		res.status(404)
		throw new Error(e, 'exercise log time not found')
	}
})

// @degs  UPDATE status of complete exercise log
// @route PATCH /api/exercises/log/complete/:id
// @accces Private

export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
	const { isCompleted } = req.body
	try {
		const exerciseLog = await prisma.exerciseLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted
			},
			include: {
				exercise: true,
				workoutLog: true
			}
		})
		res.json(exerciseLog)
	} catch (error) {}
})
