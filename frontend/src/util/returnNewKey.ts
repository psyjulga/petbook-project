import { Post } from '../../../backend/src/models/post'
import { User } from '../../../backend/src/models/user'
import { Comment } from '../../../backend/src/models/comment'

type separateStoreObject = Post[] | User[] | Comment[]

export const returnNewKey = (
	currentStoreObject: separateStoreObject
): number => {
	let newKey: number = 1

	const arr = Object.values(currentStoreObject)

	if (arr.length > 0) {
		const id_name = Object.keys(arr[0])[0]
		const ids = arr?.map((obj) => obj[id_name])

		if (ids.length === 1) newKey = 2
		if (ids.length > 1) newKey = Math.max(...ids)
	}

	return newKey
}
