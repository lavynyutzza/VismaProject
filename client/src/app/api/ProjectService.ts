const BASE_URL = 'http://localhost:3001/api';

class ProjectService{
	async getAll() {
		const response = await fetch(`${BASE_URL}/projects`);
		const data = await response.json();
		return data;
	}

	async InsertProject(project) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project)
		};

		await fetch(`${BASE_URL}/projects`, requestOptions)
		.then(response => console.log(response.json()));
	}
}

export default new ProjectService();