import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'
import { createNewWorkoutLog } from './log/workout-log.controller.js'
import { getWorkoutLog } from './log/get-workout-log.controller.js'
import { updateCompleteWorkoutLog } from './log/update-workout-log.js'

const workoutRouter = Router()
workoutRouter
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)
workoutRouter
	.route('/')
	.get(protect, getWorkouts)
	.post(protect, createNewWorkout)

workoutRouter
	.route('/log/:id')
	.post(protect, createNewWorkoutLog)
	.get(protect, getWorkoutLog)
workoutRouter
	.route('/log/complete/:id')
	.patch(protect, updateCompleteWorkoutLog)

export default workoutRouter

//
