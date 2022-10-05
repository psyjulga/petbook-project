import React from 'react'
import '../styles/styles.css'

const Footer = () => {
	return (
		<div className="footer">
			<a
				href="https://github.com/psyjulga/petbook-project"
				target="_blank"
				rel="noreferrer"
				title="Code on Github"
				style={{
					color: 'rgb(25, 135, 84)',
					marginRight: '5px',
					fontWeight: 'bold',
				}}
			>
				Open-source code
			</a>
			🐞by Julia Bestgen💃
		</div>
	)
}

export default Footer
