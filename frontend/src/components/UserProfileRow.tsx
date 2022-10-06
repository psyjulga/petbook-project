import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { handleEditUser } from '../actions/users'
import NewPicture from './NewPicture'

const UserProfileRow = (props: any) => {
	const { dispatch, authedUser, entry, user, keyOfUserObject } = props
	const { user_id }: User = user
	const { token } = authedUser

	const [edit, setEdit] = useState(false)
	const [inputValue, setInputValue] = useState(' ')

	const isProfilePic = entry[0] === 'profile_pic'

	const editUser = () => {
		if (edit === true) {
			if (!isProfilePic) {
				dispatch(
					handleEditUser(
						user_id as number,
						entry[0],
						inputValue,
						token,
						keyOfUserObject
					)
				).then(setInputValue(' '))
			}
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
			<div className="col-3">{transformWord(entry[0])}</div>
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
			{!edit && <div className="col">{entry[1]}</div>}
			<div className="col-2">
				<button
					onClick={editUser}
					className={edit ? 'btn btn-warning' : 'btn btn-success'}
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
