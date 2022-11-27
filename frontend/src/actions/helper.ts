export function removeImageFromFrontend(image: string) {
	return () => {
		return fetch(`http://localhost:8000/shared/${image}`, {
			method: 'DELETE',
		})
			.then((res) => {
				return res.json()
			})
			.then((responseMessage: string) => {
				return responseMessage
			})
			.catch((e) => {
				console.log('error in removeImageFromFrontend: ', e)
			})
	}
}
