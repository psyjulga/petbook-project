import React, { ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleAddUserPicture } from '../actions/users'
import { User } from '../../../backend/src/models/user'
import { Pet } from '../../../backend/src/models/pet'
import { Post } from '../../../backend/src/models/post'
import { handleAddPostImage } from '../actions/posts'

const NewPicture = (props: any): ReactElement => {
	const { dispatch, keyOfObject, id, table } = props // id & table (users, pets, posts) from parent component
	const { register, handleSubmit } = useForm()
	const [pic, setPic] = useState(false)

	// USAGE of this component
	// a) user profile picture
	// b) pet profile picture
	// c) post image

	const isUser: boolean = table === 'users'
	const isPet: boolean = table === 'pets'
	const isPost: boolean = table === 'posts'

	const onSubmit = (data: any) => {
		const pic: File = data.file[0]
		const formData = new FormData()
		formData.append('file', pic)
		formData.append('table', table)

		if (isUser) {
			dispatch(handleAddUserPicture(id, formData, keyOfObject)).then(() => {
				setPic(true)
			})
		}

		// if (isPet) {
		// 	dispatch(handleAddPetPicture(id, formData, keyOfObject)).then(() => {
		// 		setPic(true)
		// 	})
		// }

		if (isPost) {
			dispatch(handleAddPostImage(id, formData, keyOfObject)).then(() => {
				setPic(true)
			})
		}
	}

	return (
		<div
			className="new-picture m-3 border border-2 border-success border-opacity-25 rounded p-3"
			style={{ width: '300px', maxWidth: '90%' }}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="fileInput" className="form-label">
					{isPost
						? 'Choose an Image for your Post'
						: 'Choose a Profile Picture'}
				</label>
				<input
					className="form-control"
					type="file"
					id="fileInput"
					{...register('file')}
				/>
				<button className="btn btn-success">Upload</button>
			</form>
		</div>
	)
}

const mapStateToProps = ({ users, pets, posts }: any, { id, table }: any) => {
	switch (table) {
		case 'users': {
			const usersArr: User[] = Object.values(users)
			const keyOfObject: number = usersArr.findIndex((u) => u.user_id === id)
			return { keyOfObject, id, table }
		}

		case 'pets': {
			const petsArr: Pet[] = Object.values(pets)

			const keyOfObject: number = petsArr.findIndex((p) => p.pet_id === id)

			return { keyOfObject, id, table }
		}
		case 'posts': {
			const postsArr: Post[] = Object.values(posts)
			const keyOfObject: number = postsArr.findIndex((p) => p.post_id === id)

			return { keyOfObject, id, table }
		}
	}
}

export default connect(mapStateToProps)(NewPicture)
