import { Pet, PetStore } from '../models/pet'

const store = new PetStore()

const populatedTestPet: Pet = {
	// is inserted into the database via the test command
	// will only be used in this test suite
	pet_id: 4,
	type: 'test-dog',
	breed: 'Malteser',
	name: 'Sherley',
	birthday: '2014-08-20', // !! format
	color: 'white',
	eye_color: 'black',
	profile_pic: null,
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
		expect(res.length).toBeGreaterThanOrEqual(1)
		const findPet = res.find((pet) => pet.name === 'Sherley')
		expect(findPet).not.toBe(undefined)
	})

	test('show method should return a pet by id', async () => {
		const res = await store.show('4')
		res.birthday = '2014-08-20'
		expect(res).toEqual(populatedTestPet)
	})

	test('showPetsByUser method should return all pets of a certain user', async () => {
		// queried from join table users_pets
		const res = await store.showPetsByUser('3')
		const petFromUser = {
			users_pets_id: 4,
			user_id: '3',
			pet_id: '4',
		}

		expect(res).toEqual([petFromUser])
	})

	test('showPetsByProp method should return all pets with a prop of a certain value => filter', async () => {
		const res = await store.showPetsByProp('breed', 'Malteser')
		if (res.length) {
			res[0].birthday = '2014-08-20'
		}
		expect(res).toEqual([populatedTestPet])
	})

	test('edit method should edit a certain field and return the edited pet', async () => {
		const res = await store.edit('4', 'color', 'grey')
		expect(res).not.toEqual(populatedTestPet)
		expect(res.color).toBe('grey')
	})

	test('delete method should remove the pet from the database and return it', async () => {
		const res = await store.delete('4', '3')
		if (res) {
			res.birthday = '2014-08-20'
		}

		populatedTestPet.color = 'grey'
		expect(res).toEqual(populatedTestPet)

		await store.closeClient()
	})
})
