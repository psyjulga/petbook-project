import { User } from '../../../backend/src/models/user'
import { Pet } from '../../../backend/src/models/pet'
import { Post } from '../../../backend/src/models/post'
import { Comment } from '../../../backend/src/models/comment'
import { Like } from '../../../backend/src/models/like'

export type AuthedUser = {
	token: string
	user_name: string
}

export type StoreObject = {
	authedUser: AuthedUser
	users: User[]
	pets: Pet[]
	posts: Post[]
	comments: Comment[]
	likes: Like[]
}
