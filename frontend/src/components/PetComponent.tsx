import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Pet } from '../../../backend/src/models/pet'
import NewPicture from './NewPicture'

type Props = {
	pet: Pet
}

const PetComponent = (props: Props) => {
	const { pet } = props

	const { pet_id, type, pet_name, birthday, profile_pic, about_paragraph } = pet

	// birthday => calculate and show age

	return (
		<section className="pet m-4">
			<div className="card card-pet">
				{profile_pic && (
					<img
						src={window.location.origin + `/images/${profile_pic}`}
						className="card-img-top img-fluid"
						alt={`${pet_name} profile picture`}
					/>
				)}
				{!profile_pic && <NewPicture id={pet_id as number} table={'pets'} />}
				<div className="card-body">
					<h5 className="card-title">{`${pet_name} (${type})`}</h5>
					<p className="card-text">{about_paragraph}</p>
					<Link className="btn btn-success" to={'/user_profile'}>
						{`${pet_name}'s Profile`}
					</Link>
				</div>
			</div>
		</section>
	)
}

export default PetComponent
