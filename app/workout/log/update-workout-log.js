import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @degs  Update workout log completed
// @route PATCH /api/workouts/log/completed/:id
// @accces Private

export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
	const logId = +req.params.id
	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: logId
			},
			data: {
				isCompleted: true
			}
		})
		res.json(workoutLog)
	} catch (e) {
		res.status(404)
		throw new Error(e, 'workout log not found')
	}
})
