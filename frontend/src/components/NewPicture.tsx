import React, { ReactElement, useState, useRef, RefObject } from 'react'
import { connect } from 'react-redux'
import { FieldValues, RefCallBack, useForm } from 'react-hook-form'
import { handleAddUserPicture } from '../actions/users'
import { User } from '../../../backend/src/models/user'
import { Pet } from '../../../backend/src/models/pet'
import { Post } from '../../../backend/src/models/post'
import { handleAddPostImage } from '../actions/posts'
import { StoreObject } from '../util/types'

type Props = {
	dispatch: Function
	keyOfObject: number
	id: number | undefined
	table: 'users' | 'pets' | 'posts'
}

const NewPicture = (props: Props): ReactElement => {
	const { dispatch, keyOfObject, id, table } = props // id & table (users, pets, posts) from parent component
	const { register, handleSubmit } = useForm()
	const { onChange, onBlur, name, ref } = register('file')
	const inputRef = useRef<HTMLInputElement>(null) // for input styling

	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [clicked, setClicked] = useState(false)

	// USAGE of this component
	// a) user profile picture
	// b) pet profile picture
	// c) post image

	const isUser: boolean = table === 'users'
	const isPet: boolean = table === 'pets'
	const isPost: boolean = table === 'posts'

	const addPicture = (action: Function, formData: FormData) => {
		dispatch(action(id?.toString() as string, formData, keyOfObject))
			.then(() => setDisabled(true))
			.catch((e: Error) => setError(e))
	}

	const onSubmit = (data: FieldValues) => {
		const pic: File = data.file[0]
		const formData: FormData = new FormData()
		formData.append('file', pic)
		formData.append('table', table)

		if (isUser) addPicture(handleAddUserPicture, formData)
		// if (isPet) addPicture(handleAddPetPicture, formData)
		if (isPost) addPicture(handleAddPostImage, formData)
	}

	if (error) throw error

	return (
		<div className="new-picture m-3 border border-2 border-success border-opacity-25 rounded p-3">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					onInput={(e) => setDisabled(false)}
					className="form-control"
					type="file"
					id="fileInput"
					style={{ display: 'none' }}
					onChange={onChange}
					onBlur={onBlur}
					name={name}
					// {...register('file')}
					ref={clicked ? ref : inputRef}
				/>

				{/* style this button to style file input */}
				<button
					type="button"
					className="select-image-button btn btn-success"
					style={{ width: 120, marginRight: 5, borderRadius: 25 }}
					onClick={() => {
						inputRef.current?.click()
						setClicked(true)
					}}
				>
					{clicked ? 'Select and click upload:' : 'Select an Image'}
				</button>

				<button
					type="submit"
					disabled={disabled}
					className={disabled ? 'btn btn-success' : 'btn btn-warning'}
					style={{ borderRadius: 50, marginLeft: 5 }}
				>
					Upload
				</button>
			</form>
		</div>
	)
}

type DrilledProps = {
	id: number | undefined
	table: 'users' | 'pets' | 'posts'
}

const mapStateToProps = (
	{ users, pets, posts }: StoreObject,
	{ id, table }: DrilledProps
) => {
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
