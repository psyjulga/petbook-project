import { Pet, PetStore } from '../models/pet'

const store = new PetStore()

const populatedTestPet: Pet = {
	// is inserted into the database via the test command
	pet_id: 1,
	type: 'cat',
	breed: 'Norwegian Forest Cat',
	name: 'Marilyn',
	birthday: '2002-05-22', // !! format
	color: 'black',
	eye_color: 'yellow',
	profile_pic: 'src/pics/Marilyn.jpg', // !! buffer ..
}

describe('Pet Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a showPetsByUser method', () => {
		expect(store.showPetsByUser).toBeDefined()
	})

	test('should have a showPetsByProp method', () => {
		expect(store.showPetsByProp).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have an edit method', () => {
		expect(store.edit).toBeDefined()
	})

	test('should have a delete method', () => {
		expect(store.delete).toBeDefined()
	})

	test('create method should add a pet to the database', async () => {
		const testPetToAdd: Pet = {
			type: 'turtle',
			breed: null,
			name: 'Ninja',
			birthday: '2020-08-02',
			color: 'green',
			eye_color: 'brown',
			profile_pic: null,
		}

		const res = await store.create(testPetToAdd)
		res.birthday = '2020-08-02'
		testPetToAdd.pet_id = 100
		res.pet_id = 100

		expect(res).toEqual(testPetToAdd)
	})

	test('index method should return a list of all pets', async () => {
		const res = await store.index()
		res[0].birthday = '2002-05-22'
		res[0].profile_pic = null
		populatedTestPet.profile_pic = null
		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestPet)
	})

	test('show method should return a pet by id', async () => {
		const res = await store.show('1')
		res.profile_pic = null
		res.birthday = '2002-05-22'
		expect(res).toEqual(populatedTestPet)
	})

	test('showPetsByUser method should return all pets of a certain user', async () => {
		// queried from join table users_pets
		const res = await store.showPetsByUser('1')
		const pet1 = {
			users_pets_id: 1,
			user_id: '1',
			pet_id: '1',
		}
		const pet2 = {
			users_pets_id: 2,
			user_id: '1',
			pet_id: '3',
		}
		expect(res).toEqual([pet1, pet2])
	})

	test('showPetsByProp method should return all pets with a prop of a certain value => filter', async () => {
		const res = await store.showPetsByProp('type', 'cat')
		if (res.length) {
			res[0].birthday = '2002-05-22'
			res[0].profile_pic = null
		}
		expect(res[0]).toEqual(populatedTestPet)
	})

	test('edit method should edit a certain field and return the edited pet', async () => {
		const res = await store.edit('1', 'eye_color', 'green')
		expect(res).not.toEqual(populatedTestPet)
		expect(res.eye_color).toBe('green')
	})

	test('delete method should remove the pet from the database and return it', async () => {
		const res = await store.delete('1', '1')
		if (res) {
			res.birthday = '2002-05-22'
			res.profile_pic = null
		}

		populatedTestPet.eye_color = 'green'
		expect(res).toEqual(populatedTestPet)

		await store.closeClient()
	})
})
