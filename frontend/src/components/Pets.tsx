import React from 'react'
import { connect } from 'react-redux'
import { Pet } from '../../../backend/src/models/pet'
import { StoreObject } from '../util/types'
import PetContainer from './PetContainer'

type Props = {
	petsArr: Pet[]
}

const Pets = (props: Props) => {
	const { petsArr } = props

	return (
		<section className="pets">
			<ul>
				{petsArr.map((pet: Pet) => (
					<li className="pet-list-item" key={pet.pet_id}>
						<PetContainer pet={pet} />
					</li>
				))}
			</ul>
		</section>
	)
}

const mapStateToProps = ({ pets }: StoreObject) => {
	const petsArr = Object.values(pets)
	// calculate the user's pets
	return {
		petsArr,
	}
}

export default connect(mapStateToProps)(Pets)
