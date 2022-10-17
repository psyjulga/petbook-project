import React, {
	ChangeEvent,
	FormEvent,
	ReactElement,
	useEffect,
	useState,
} from 'react'
import { handleAddUser } from '../actions/users'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { User } from '../../../backend/src/models/user'
import { StoreObject } from '../util/types'
import { returnNewKey } from '../util/returnNewKey'

const initialUserObject: User = {
	user_name: '',
	first_name: '',
	last_name: '',
	email: '',
	country: '',
	city: '',
	password: '',
}

type Props = {
	dispatch: any
	newKey: number
}

const NewUser = (props: Props): ReactElement => {
	const { dispatch, newKey } = props
	const navigate = useNavigate()

	const [user, setUser] = useState(initialUserObject)
	const [disabled, setDisabled] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const checkInput = () => {
		const userDataComplete: boolean = !Object.values(user).includes('')
		if (userDataComplete) setDisabled(false)
	}

	useEffect(() => {
		checkInput()
	}, [user])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(handleAddUser(user, newKey))
			.then(() => {
				navigate('/newsfeed')
			})
			.catch((e: Error) => setError(e))
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	if (error) throw error

	return (
		<div className="new-user">
			<form onSubmit={handleFormSubmit} className="m-5">
				{/* USERNAME */}
				<div className="mb-3">
					<label htmlFor="usernameInput" className="form-label">
						Username
					</label>
					<input
						onChange={handleInputChange}
						name="user_name"
						required
						type="text"
						className="form-control"
						id="usernameInput"
					/>
				</div>
				{/* FIRST NAME */}
				<div className="mb-3">
					<label htmlFor="firstNameInput" className="form-label">
						First Name
					</label>
					<input
						onChange={handleInputChange}
						name="first_name"
						required
						type="text"
						className="form-control"
						id="firstNameInput"
					/>
				</div>
				{/* LAST NAME */}
				<div className="mb-3">
					<label htmlFor="lastNameInput" className="form-label">
						Last Name
					</label>
					<input
						name="last_name"
						onChange={handleInputChange}
						required
						type="text"
						className="form-control"
						id="lastNameInput"
					/>
				</div>
				{/* COUNTRY */}
				<div className="mb-3">
					<label htmlFor="countryInput" className="form-label">
						Country
					</label>
					<input
						name="country"
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="countryInput"
					/>
				</div>
				{/* CITY */}
				<div className="mb-3">
					<label htmlFor="cityInput" className="form-label">
						City
					</label>
					<input
						name="city"
						onChange={handleInputChange}
						type="text"
						className="form-control"
						id="cityInput"
					/>
				</div>
				{/* EMAIL */}
				<div className="mb-3">
					<label htmlFor="emailInput" className="form-label">
						Email
					</label>
					<input
						name="email"
						onChange={handleInputChange}
						required
						type="email"
						className="form-control"
						id="emailInput"
					/>
				</div>
				{/* PASSWORD */}
				<div className="mb-3">
					<label htmlFor="passwordInput" className="form-label">
						Password
					</label>
					<input
						name="password"
						onChange={handleInputChange}
						required
						type="password"
						className="form-control"
						id="passwordInput"
					/>
				</div>
				{/* BUTTON */}
				<button
					disabled={disabled}
					type="submit"
					className="btn btn-success mt-3"
				>
					Create an Account
				</button>
			</form>
		</div>
	)
}

const mapStateToProps = ({ users }: StoreObject) => {
	const newKey = returnNewKey(users)

	return { newKey }
}

export default connect(mapStateToProps)(NewUser)
