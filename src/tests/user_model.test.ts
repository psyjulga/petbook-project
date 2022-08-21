import { User, UserStore } from '../models/user'

const store = new UserStore()

const populatedTestUser: User = {
	// is inserted into the database via the test command
	user_id: 1,
	user_name: 'Ladybug',
	first_name: 'Julia',
	last_name: 'Bestgen',
	email: 'psyjulga@yahoo.de',
	country: 'Germany',
	city: 'Cologne',
	profile_pic: 'src/pics/ladybug.jpg', // ???!!! buffer ..
	password: 'secret123',
}

describe('User Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have a authenticate method', () => {
		expect(store.authenticate).toBeDefined()
	})

	test('should have a addPetToUser method', () => {
		expect(store.addPetToUser).toBeDefined()
	})

	test('should have a removePetFromUser method', () => {
		expect(store.removePetFromUser).toBeDefined()
	})

	test('should have an edit method', () => {
		expect(store.edit).toBeDefined()
	})

	test('should have a delete method', () => {
		expect(store.delete).toBeDefined()
	})

	test('create method should add a user to the database and return the user if the user_name is unique', async () => {
		const testUserToAdd: User = {
			user_name: 'Dances with Wolves',
			first_name: 'Kevin',
			last_name: 'Costner',
			email: 'kevin@gmail.com',
			country: 'USA',
			city: 'New York',
			profile_pic: null,
			password: 'wolf123',
		}

		const res = await store.create(testUserToAdd)
		if (res) {
			res.password = 'wolf123'
			testUserToAdd.user_id = 3
		}
		expect(res).toEqual(testUserToAdd)
	})

	test('create method should return null if the user_name already exists', async () => {
		const testUserToAdd: User = {
			user_name: 'Ganesha',
			first_name: 'a',
			last_name: 'b',
			email: 'ab@gmail.com',
			country: 'USA',
			city: 'New York',
			profile_pic: null,
			password: 'abc123',
		}

		const res = await store.create(testUserToAdd)
		expect(res).toBe(null)
	})

	test('index method should return a list of all users', async () => {
		const res = await store.index()
		res[0].profile_pic = 'src/pics/ladybug.jpg'

		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestUser)
	})

	test('show method should return a user by id', async () => {
		const res = await store.show('1')
		res.profile_pic = 'src/pics/ladybug.jpg'
		expect(res).toEqual(populatedTestUser)
	})

	test('authenticate method should return the user if the username exists and the password is correct', async () => {
		const res = await store.authenticate('Dances with Wolves', 'wolf123')
		expect(res).not.toBe(null)
		expect(res?.password).not.toBe('wolf123') // pw in db is encrypted
		expect(typeof res?.password).toBe('string')
	})

	test('authenticate method should return null if the username exists but the password is not correct', async () => {
		const res = await store.authenticate('Ladybug', 'wrong-password')
		expect(res).toBe(null)
	})

	test('authenticate method should return null if the username does not exist', async () => {
		const res = await store.authenticate('Non-existent-username', 'secret123')
		expect(res).toBe(null)
	})

	test('addPetToUser method should create a connection between pet and user with the join table', async () => {
		const res = await store.addPetToUser('3', '2')
		expect(res.users_pets_id).toBe(4)
	})

	test('removePetFromUser method should cancel the connection between pet and user with the join table', async () => {
		const res = await store.removePetFromUser('3', '2')
		expect(res.users_pets_id).toBe(4)
	})

	test('edit method should edit a certain field and return the edited user', async () => {
		const res = await store.edit('1', 'city', 'Waldbröl')
		expect(res).not.toEqual(populatedTestUser)
		expect(res.city).toBe('Waldbröl')
	})

	test('delete method should remove the user from the database and return it - delete account', async () => {
		const res = await store.delete('2')
		expect(res.user_name).toBe('Ganesha')

		await store.closeClient()
	})
})
