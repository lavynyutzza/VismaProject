import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectsTable(props) {

	const [data, setData] = useState([] as any);
	const [sortType, setSortType] = useState('id');
	const projects = props.data;

	const sortNumbers = function(a, b, sortProperty) {
		return a[sortProperty] - b[sortProperty];
	}

	const sortStringOrDate = function(a, b, sortProperty) {
		if(a[sortProperty].toString().toLowerCase() < b[sortProperty].toString().toLowerCase()) return -1;
		if(a[sortProperty].toString().toLowerCase() > b[sortProperty].toString().toLowerCase()) return 1;
		return 0;
	}

	useEffect(() => {
	  	const sortArray = type => {
			const types = {
				id: 'id',
				name: 'name',
				deadline: 'deadline',
				};
		const sortProperty = types[type];
		const sorted =  sortProperty === types["id"] ? 
			([...projects].sort((a, b) => sortNumbers(a, b, sortProperty))) :
			([...projects].sort((a, b) => sortStringOrDate(a, b, sortProperty)));

		setData(sorted);
		console.log(sorted);
	  };
	  sortArray(sortType);
	}, [sortType]); 
	

	function formatDate(date: string){
		return new Intl.DateTimeFormat("en-GB",
						{
							year: "numeric",
							month: "long",
							day: "2-digit"
						}).format(new Date(date));
	}

	return (
		<>
		<div className="flex justify-end">
			<label>Sort by: </label>
			<select onChange={(e) => setSortType(e.target.value)}> 
				<option value="id">id</option>
				<option value="name">name</option>
				<option value="deadline">deadline</option>
			</select>
		</div>

		<table className="table-fixed w-full">
			<thead className="bg-gray-200">
				<tr>
					<th className="border px-4 py-2 w-12">#</th>
					<th className="border px-4 py-2">Project Name</th>
					<th className="border px-4 py-2">Description</th>
					<th className="border px-4 py-2">Deadline</th>
					<th className="border px-4 py-2">ClientName</th>
					<th className="border px-4 py-2"></th>
				</tr>
			</thead>
			<tbody>
			{ data.map(
				project => 
				<tr key={project.id}>
					<td className="border px-4 py-2 w-12">{project.id}</td>
					<td className="border px-4 py-2">{project.name}</td>
					<td className="border px-4 py-2">{project.description}</td>
					<td className="border px-4 py-2">{formatDate(project.deadline)}</td>
					<td className="border px-4 py-2">{project.clientName}</td>
					<td className="border px-4 py-2">
						<Link to={"/projects/" + project.id} className="badge badge-warning">View</Link>
					</td>
				</tr>
			)}
			</tbody>
		</table>
		</>
	);
}