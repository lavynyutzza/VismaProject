const BASE_URL = 'http://localhost:3001/api';

class ProjectService{
	async getAll() {
		const response = await fetch(`${BASE_URL}/projects`);
		const data = await response.json();
		console.log("data in service " + data[0].name);
		return data;
	}
}

export default new ProjectService();