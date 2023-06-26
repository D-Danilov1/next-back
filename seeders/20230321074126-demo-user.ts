'use strict'

import { randomUUID } from 'crypto'

const ROLES = {
	ADMIN: 'ADMIN',
	USER: 'USER',
}

const USERS = {
	ADMIN: {
		id: randomUUID(),
		email: 'admin@gmail.com',
		password: 'adminAdmin',
	},
	USER: {
		id: randomUUID(),
		email: 'user@gmail.com',
		password: 'userUser',
	},
}

module.exports = {
	up: async queryInterface => {
		const roles = Object.values(ROLES).map(name => ({
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
		}))

		await Promise.all(
			roles.map(async role => {
				const [existingRole] = await queryInterface.sequelize.query(
					`SELECT id FROM Roles WHERE name = '${role.name}'`
				)

				if (!existingRole.length) {
					await queryInterface.bulkInsert('Roles', [role])
				}
			})
		)

		const adminRole = await queryInterface.sequelize.query(
			`SELECT id FROM Roles WHERE name = '${ROLES.ADMIN}'`
		)

		const userRole = await queryInterface.sequelize.query(
			`SELECT id FROM Roles WHERE name = '${ROLES.USER}'`
		)

		const users = Object.values(USERS).map(user => ({
			...user,
			createdAt: new Date(),
			updatedAt: new Date(),
		}))

		await Promise.all(
			users.map(async user => {
				const [existingUser] = await queryInterface.sequelize.query(
					`SELECT id FROM Users WHERE email = '${user.email}'`
				)

				if (!existingUser.length) {
					await queryInterface.bulkInsert('Users', [user])
				}
			})
		)

		const [adminUser] = await queryInterface.sequelize.query(
			`SELECT id FROM Users WHERE email = 'admin@gmail.com'`
		)

		const [regularUser] = await queryInterface.sequelize.query(
			`SELECT id FROM Users WHERE email = 'user@gmail.com'`
		)

		await queryInterface.bulkInsert('UsersRoles', [
			{
				user_id: adminUser[0].id,
				role_id: adminRole[0].id,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])

		await queryInterface.bulkInsert('UsersRoles', [
			{
				user_id: regularUser[0].id,
				role_id: userRole[0].id,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete('UserRoles', null, {})
		await queryInterface.bulkDelete('Users', null, {})
		await queryInterface.bulkDelete('Roles', null, {})
	},
}
