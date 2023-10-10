import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewExercise,
	deleteExercise,
	getExercise,
	updateExercise
} from './exercise.controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import { createNewExerciseLog } from './log/exercise-log.controller.js'
import {
	updateCompleteExerciseLog,
	updateExerciseLogTime
} from './log/update-exercise-log.js'

const exerciseRouter = Router()
exerciseRouter
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getExercise)
exerciseRouter
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)
exerciseRouter
	.route('/log/:id')
	.post(protect, createNewExerciseLog)
	.get(protect, getExerciseLog)
exerciseRouter
	.route('/log/complete/:id')
	.patch(protect, updateCompleteExerciseLog)
exerciseRouter.route('/log/time/:id').put(protect, updateExerciseLogTime)
export default exerciseRouter

//
