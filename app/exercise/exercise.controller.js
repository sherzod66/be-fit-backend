import AsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
// @degs  Post user exercise
// @route post /api/exercise
// @accces private
export const createNewExercise = AsyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})
	res.json(exercise)
})

// @degs  Get user exercise
// @route GET /api/exercise
// @accces private

export const getExercise = AsyncHandler(async (req, res) => {
	const exercise = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(exercise)
})
// @degs  PUT user exercise
// @route PUT /api/exercise/:id
// @accces private
export const updateExercise = AsyncHandler(async (req, res) => {
	const { name, iconPath, times } = req.body
	try {
		const update = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				iconPath,
				times
			}
		})
		res.json(update)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

// @degs  DELETE user exercise
// @route DELETE /api/exercise/:id
// @accces private
export const deleteExercise = AsyncHandler(async (req, res) => {
	try {
		const deleteExercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({ message: 'Exercise deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
