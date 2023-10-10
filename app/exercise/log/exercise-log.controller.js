import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @degs  Create new exerciseLog
// @route POST /api/exercises/log/exerciseId
// @accces Private

export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = +req.params.id

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})
	let timesDefault = []
	if (!exercise) {
		res.status(404)
		throw new Error('exercise not found')
	}
	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		})
	}
	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})
