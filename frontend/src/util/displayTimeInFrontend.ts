const displayTimeInFrontend = (timestring: string) => {
	const timeArr = timestring.split(' ')
	const time = timeArr.slice(1, 5).join(' ')

	return time
}

export default displayTimeInFrontend
