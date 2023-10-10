import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.js'

// @desc  GET workout log
// @route GET /api/workouts/log/:workoutId
// @acccess Private

export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutId = +req.params.id
	try {
		const workoutLog = await prisma.workoutLog.findUnique({
			where: {
				id: workoutId
			},
			include: {
				workout: {
					include: {
						exercises: true
					}
				},
				exerciseLogs: {
					orderBy: {
						id: 'desc'
					},
					include: {
						exercise: true
					}
				}
			}
		})
		res.json({
			...workoutLog,
			minute: calculateMinute(workoutLog.workout.exercises.length)
		})
	} catch (error) {
		res.status(404)
		throw new Error('Workout log not found')
	}
})
