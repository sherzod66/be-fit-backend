import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { generateToken } from './generate-token.js'
import { userFields } from '../util/userAuthInfo.js'

//@access Public
//@desc Auth user
//@route POST /api/auth/login
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	const isValidPass = await verify(user.password, password)
	if (user && isValidPass) {
		const token = generateToken(user.id)
		res.json({ user, token })
	} else {
		res.status(401)
		throw new Error("User already do'nt exist")
	}
})

//@access Public
//@desc Register user
//@route POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})
	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exist')
	}
	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: userFields
	})
	const token = generateToken(user.id)
	res.json({ user, token })
})
