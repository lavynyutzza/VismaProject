const BASE_URL = 'http://localhost:3001/api/projects';

class ProjectService{
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

	async searchProjectByName(name) {
		const response = await fetch(`${BASE_URL}/${name}/search`);
		const data = await response.json();
		return data;
	}

	async getProjectActivities(id) {
		const response = await fetch(`${BASE_URL}/${id}/activities`);
		const data = await response.json();
		return data;
	}

	async InsertProject(project) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project)
		};

		await fetch(`${BASE_URL}`, requestOptions)
		.then(response => console.log(response.json()));
	}

	async UpdateProject(project) {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project)
		};

		await fetch(`${BASE_URL}`, requestOptions)
		.then(response => console.log(response.json()));
	}
}

export default new ProjectService();