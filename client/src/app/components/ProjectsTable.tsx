import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectsTable(props) {
	return (
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
			{ props.data.map(
				project => 
				<tr key={project.id}>
					<td className="border px-4 py-2 w-12">{project.id}</td>
					<td className="border px-4 py-2">{project.name}</td>
					<td className="border px-4 py-2">{project.description}</td>
					<td className="border px-4 py-2">{project.deadline}</td>
					<td className="border px-4 py-2">{project.clientName}</td>
					<td className="border px-4 py-2">
						<Link to={"/projects/" + project.id} className="badge badge-warning">View</Link>
					</td>
				</tr>
			)}
			</tbody>
		</table>
	);
}