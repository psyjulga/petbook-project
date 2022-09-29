import React from 'react'

const Footer = () => {
	return (
		<div
			className="footer"
			style={{
				position: 'fixed',
				bottom: 0,
				width: '100%',
				textAlign: 'center',
				padding: '20px',
				backgroundColor: 'rgb(248, 249, 250)',
			}}
		>
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
