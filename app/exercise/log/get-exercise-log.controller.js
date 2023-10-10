import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.util.js'

// @degs  GET exerciseLog
// @route GET /api/exercises/log/:id
// @accces Private

export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercise: true,
			times: true
		}
	})
	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found')
	}
	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})
	const newTimes = addPrevValues(exerciseLog, prevExerciseLog)
	res.json({ ...exerciseLog, times: newTimes })
})
