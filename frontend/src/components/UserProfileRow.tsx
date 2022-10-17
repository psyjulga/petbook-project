import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { handleEditUser } from '../actions/users'
import NewPicture from './NewPicture'
import '../styles/styles.css'
import { StoreObject } from '../util/types'

const UserProfileRow = (props: any) => {
	const { dispatch, authedUser, entry, user, keyOfUserObject } = props
	const { user_id }: User = user
	const { token } = authedUser

	const [edit, setEdit] = useState(false)
	const [inputValue, setInputValue] = useState(' ')
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState(null)

	const isProfilePic = entry[0] === 'profile_pic'

	const saveEditedUser = () => {
		if (!isProfilePic) {
			dispatch(
				handleEditUser(
					user_id as number,
					entry[0],
					inputValue,
					token,
					keyOfUserObject
				)
			)
				.then(setInputValue(' '))
				.catch((e: any) => setError(e))
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

	return (
		<div className="user-profile-row row">
			{/* col1 => the field's name (e.g. first name) */}
			<div className="col-3">{transformWord(entry[0])}</div>

			{/* VIEW 1 => edit === false */}
			{/* col2 => the field's current value (to be edited) */}
			{!edit && <div className="col">{entry[1]}</div>}
			{!edit && (
				<div className="col-2">
					{/* col3 => EDIT BUTTON */}
					<button onClick={() => setEdit(true)} className="btn btn-success">
						Edit
					</button>
				</div>
			)}

			{/* VIEW 2 => edit === true */}
			{/* col2 => input for new value */}
			{edit && (
				<div className="col">
					{' '}
					{isProfilePic ? (
						<NewPicture id={user_id} table={'users'} />
					) : (
						<input
							type="text"
							placeholder="Enter new value"
							onChange={onInputChange}
						/>
					)}
				</div>
			)}
			{edit && (
				<div className="col-2">
					{/* col3 => SAVE BUTTON */}
					<button
						disabled={isProfilePic ? false : disabled}
						onClick={saveEditedUser}
						className={
							edit && !disabled ? 'btn btn-warning' : 'btn btn-success'
						}
					>
						Save
					</button>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = ({ authedUser, users }: StoreObject) => {
	const usersArr: User[] = Object.values(users)

	const keyOfUserObject: number = usersArr.findIndex(
		(u) => u.user_name === authedUser.user_name
	)
	return { authedUser, keyOfUserObject }
}

export default connect(mapStateToProps)(UserProfileRow)
