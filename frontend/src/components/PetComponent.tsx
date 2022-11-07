import React from 'react'
import { Link } from 'react-router-dom'
import { Pet } from '../../../backend/src/models/pet'
import NewPicture from './NewPicture'
import '../styles/styles.css'

type Props = {
	pet: Pet
}

const PetComponent = (props: Props) => {
	const { pet } = props

	const { pet_id, type, pet_name, birthday, profile_pic, about_paragraph } = pet
	const about = about_paragraph ? about_paragraph : 'add about in profile'
	const pic = profile_pic ? profile_pic : 'default_pet.jpg'

	const date = new Date()
	const yearCurrent = date.getFullYear()
	const yearBirth = Number(birthday?.split('-')[0])
	const age = yearCurrent - yearBirth

	return (
		<section className="pet me-3 mb-3">
			<div className="card card-pet">
				<img
					src={window.location.origin + `/images/${pic}`}
					className="card-img-top img-fluid"
					alt={`${pet_name} profile picture`}
				/>

				{/* {!profile_pic && <NewPicture id={pet_id as number} table={'pets'} />} */}
				<div className="card-body">
					<h5 className="card-title pet-name">{`${pet_name} 💚`}</h5>
					<h6>{`${age}-year-old ${type}`}</h6>
					<p className="card-text">{about}</p>

					{/* to pet profile */}
					<Link className="btn btn-success" to={'/user_profile'}>
						{`${pet_name}'s Profile`}
					</Link>
				</div>
			</div>
		</section>
	)
}

export default PetComponent
