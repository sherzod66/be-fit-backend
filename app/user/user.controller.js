import AsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userFields } from '../util/userAuthInfo.js'
// @degs  Get user profile
// @route GET /api/user/profile
// @accces private
export const getUserProfile = AsyncHandler(async (req, res) => {
	//{minutes, workouts, kgs}
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: userFields
	})
	const countExerciseTimeCompiled = await prisma.exerciseLog.count({
		where: {
			id: req.user.id,
			isCompleted: true
		}
	})
	const workouts = await prisma.workoutLog.count({
		where: {
			userId: user.id,
			isCompleted: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: req.user.id
			},
			isCompleted: true
		},
		_sum: {
			weight: true
		}
	})
	res.json({
		...user,
		statistics: [
			{
				label: 'Minutes',
				value: Math.ceil(countExerciseTimeCompiled * 2.3) || 0
			},
			{
				label: 'workouts',
				value: workouts
			},
			{
				label: 'kgs',
				value: kgs._sum.weight || 0
			}
		]
	})
})
