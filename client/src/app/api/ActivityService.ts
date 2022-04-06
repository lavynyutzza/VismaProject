const BASE_URL = 'http://localhost:3001/api/activities';

class ActivityService{
	async getAll() {
		const response = await fetch(`${BASE_URL}`);
		const data = await response.json();
		return data;
	}

	async getProject(id) {
		const response = await fetch(`${BASE_URL}/${id}`);
		const data = await response.json();
		return data;
	}

	async InsertActivity(activty) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(activty)
		};

		await fetch(`${BASE_URL}`, requestOptions)
		.then(response => console.log(response.json()));
	}

	async UpdateActivity(activty) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(activty)
		};

		await fetch(`${BASE_URL}`, requestOptions)
		.then(response => console.log(response.json()));
	}
}

export default new ActivityService();