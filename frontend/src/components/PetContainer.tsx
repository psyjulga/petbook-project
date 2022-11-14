import React, { useState } from 'react'
import Profile from './Profile'
import ProfileButton from './ProfileButton'
import PetComponent from './PetComponent'
import { Pet } from '../../../backend/src/models/pet'
import '../styles/styles.css'

type Props = {
	pet: Pet
}

const PetContainer = (props: Props) => {
	const { pet } = props // from parent (loop)
	const { pet_name } = pet
	const [showProfile, setShowProfile] = useState(false)

	return (
		<div className="pet-container mt-2">
			{showProfile ? (
				<Profile
					table="pets"
					object={pet as Pet}
					handleClick={() => setShowProfile(false)}
				/>
			) : (
				<PetComponent pet={pet} />
			)}
			{!showProfile && (
				<div className="button-container text-center">
					<ProfileButton
						text={`${pet_name}'s Profile`}
						handleClick={() => setShowProfile(true)}
						buttonStyle="btn-success"
					/>
				</div>
			)}
		</div>
	)
}

export default PetContainer
