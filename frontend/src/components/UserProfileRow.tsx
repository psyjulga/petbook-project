import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { handleEditUser } from '../actions/users'

const UserProfileRow = (props: any) => {
	const { dispatch, authedUser, entry, user, keyOfUserObject } = props
	const { user_id } = user
	const { token } = authedUser

	const [edit, setEdit] = useState(false)
	const [inputValue, setInputValue] = useState(' ')

	const editUser = () => {
		if (edit === true) {
			dispatch(
				handleEditUser(user_id, entry[0], inputValue, token, keyOfUserObject)
			).then(setInputValue(' '))
		}
		setEdit(!edit)
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setInputValue(value)
	}

	const transformWord = (word: string) => {
		return word
			.split('_')
			.map((w) => w.toUpperCase())
			.join(' ')
	}

	return (
		<div className="user-profile-row row">
			<div className="col-5">{transformWord(entry[0])}</div>
			{edit && (
				<div className="col-5>">
					<input
						type="text"
						placeholder="Enter new value"
						onChange={onInputChange}
					/>
				</div>
			)}
			{!edit && <div className="col-5">{entry[1]}</div>}
			<div className="col-2">
				<button
					onClick={editUser}
					className="btn btn-success"
					style={{ width: '100%' }}
				>
					{edit ? 'Save' : 'Edit'}
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = ({ authedUser, users }: any) => {
	const usersArr: User[] = Object.values(users)

	const keyOfUserObject: number = usersArr.findIndex(
		(u) => u.user_name === authedUser.user_name
	)
	return { authedUser, keyOfUserObject }
}

export default connect(mapStateToProps)(UserProfileRow)
