import React, { useState } from 'react'
import Profile from './Profile'
import ProfileButton from './ProfileButton'
import PetComponent from './PetComponent'
import { Pet } from '../../../backend/src/models/pet'

type Props = {
	pet: Pet
}

const PetContainer = (props: Props) => {
	const { pet } = props // from parent (loop)
	const { pet_name } = pet
	const [showProfile, setShowProfile] = useState(false)

	return (
		<div className="user-container">
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
				<ProfileButton
					text={`${pet_name}'s Profile`}
					handleClick={() => setShowProfile(true)}
				/>
			)}
		</div>
	)
}

export default PetContainer
