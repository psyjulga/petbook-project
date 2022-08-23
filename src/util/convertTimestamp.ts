export default function convertTimestamp(timestamp: string): string {
	const splitTimestamp = timestamp.split(' ')

	let yearXXXX = splitTimestamp[3]
	let monthXX = splitTimestamp[1]
	let dayXX = splitTimestamp[2]

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	months.map((m, i) => {
		// e.g. from Aug to 08

		if (m === monthXX) {
			if (i + 1 < 10) {
				monthXX = `0${i + 1}`
			} else {
				monthXX = `${i + 1}`
			}
		}
	})

	const formattedDate = `${yearXXXX}-${monthXX}-${dayXX}`

	splitTimestamp.splice(0, 4, formattedDate)
	const newTimestamp = splitTimestamp.slice(0, 2)
	const timeString = newTimestamp.join(' ')

	return timeString
}
