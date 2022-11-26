import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { Pet } from '../../../backend/src/models/pet'
import { AuthedUser, StoreObject } from '../util/types'
import { handleEditUser } from '../actions/users'
import { handleEditPet } from '../actions/pets'
import NewPicture from './NewPicture'
import MyEditButton from './MyEditButton'
import '../styles/styles.css'
import MySaveButton from './MySaveButton'

type Entry = string | number | null

type Props = {
	dispatch: Function
	authedUser: AuthedUser
	entry: Entry[]
	table: 'users' | 'pets'
	object: User | Pet
	usersArr: User[]
	petsArr: Pet[]
}

const ProfileRow = (props: Props) => {
	const { dispatch, authedUser, entry, table, object, usersArr, petsArr } =
		props
	// entry, table, object from parent component
	const { token, user_name } = authedUser

	const id = Object.values(object)[0]
	const keyOfObject =
		table === 'users'
			? usersArr.findIndex((u) => u.user_name === user_name)
			: petsArr.findIndex((p) => p.pet_id === id)

	const [edit, setEdit] = useState(false)
	const [inputValue, setInputValue] = useState(' ')
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	// 2002-05-21T22:00:00.000Z
	const isProfilePic = entry[0] === 'profile_pic'
	const isBirthday = entry[0] === 'birthday'

	const checkIfBirthday = (entry: Entry) => {
		if (isBirthday) {
			const birthdayString = entry as string
			const birthdayFormatted = birthdayString.split('T')[0]
			return birthdayFormatted
		}
		return entry
	}
	// !! when user puts in new birthday !! format

	const saveEditedObject = () => {
		if (!isProfilePic) {
			if (table === 'users') {
				dispatch(
					handleEditUser(
						id as number,
						entry[0] as string,
						inputValue,
						token,
						keyOfObject.toString()
					)
				)
					.then(setInputValue(' '))
					.catch((e: Error) => setError(e))
			}
			if (table === 'pets') {
				dispatch(
					handleEditPet(
						id as number,
						entry[0] as string,
						inputValue,
						token,
						keyOfObject.toString()
					)
				)
					.then(setInputValue(' '))
					.catch((e: Error) => setError(e))
			}
		}

		setEdit(!edit)
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setInputValue(value)
		setDisabled(false)
	}

	const transformWord = (word: string) => {
		return word
			.split('_')
			.map((w) => w.toUpperCase())
			.join(' ')
	}

	if (error) throw error

	// ------- col-4 --- col-6 -- col-2
	// view 1: NAME --- 'Julian' <edit-button/>
	// ------- entry[0] entry[1]

	// view 2: NAME --- <input/> <save-button/>

	return (
		<div className="profile-row row">
			{/* col1 => the field's name (e.g. first name) */}
			<div className="profile-field-name col-4">
				{transformWord(entry[0] as string)}
			</div>

			{/* VIEW 1 => edit === false */}
			{/* col2 => the field's current value (to be edited) */}
			{!edit && <div className="col-6">{checkIfBirthday(entry[1])}</div>}

			{/* col3 => EDIT BUTTON */}
			{!edit && (
				<div className="col-2 text-center">
					<MyEditButton onEdit={() => setEdit(true)} />
				</div>
			)}

			{/* VIEW 2 => edit === true */}
			{/* col2 => input for new value */}
			{edit && (
				<div className="col-6">
					{' '}
					{isProfilePic ? (
						<NewPicture id={id as number} table={table} />
					) : (
						<input
							size={15}
							type="text"
							placeholder="Enter new value"
							onChange={onInputChange}
						/>
					)}
				</div>
			)}

			{/* col3 => SAVE BUTTON */}
			{edit && (
				<div className="col-2 text-center">
					<MySaveButton
						onSave={saveEditedObject}
						disabled={isProfilePic ? false : disabled}
					/>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = ({ authedUser, users, pets }: StoreObject) => {
	const usersArr: User[] = Object.values(users)
	const petsArr: Pet[] = Object.values(pets)
	return {
		authedUser,
		usersArr,
		petsArr,
	}
}

export default connect(mapStateToProps)(ProfileRow)
