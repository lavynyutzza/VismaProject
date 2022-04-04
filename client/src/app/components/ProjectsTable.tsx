import React from 'react';

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
				</tr>
			</thead>
			<tbody>
			{ props.data.map(
				project => 
				<tr>
					<td className="border px-4 py-2 w-12">{project.id}</td>
					<td className="border px-4 py-2">{project.name}</td>
					<td className="border px-4 py-2">{project.description}</td>
					<td className="border px-4 py-2">{project.deadline}</td>
					<td className="border px-4 py-2">{project.clientName}</td>

				</tr>
			)}
			</tbody>
		</table>
	);
}