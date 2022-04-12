import React from 'react';

export default function ActivitiesTable(props) {
	return (
		<table className="table-fixed w-full">
			<thead className="bg-gray-200">
				<tr>
					<th className="border px-4 py-2 w-12">Id</th>
					<th className="border px-4 py-2">Activity Name</th>
					<th className="border px-4 py-2">Description</th>
					<th className="border px-4 py-2">Hours Spent</th>
					<th className="border px-4 py-2"/>
				</tr>
			</thead>
			<tbody>
			{ props.data.map(
				activity => 
				<tr key={activity.id}>
					<td className="border px-4 py-2 w-12">{activity.id}</td>
					<td className="border px-4 py-2">{activity.name}</td>
					<td className="border px-4 py-2">{activity.description}</td>
					<td className="border px-4 py-2">{activity.hoursSpent}</td>
					<td className="border px-4 py-2">
						<button onClick= { () => props.deleteActivity(activity.id)}>Delete</button>
					</td>
				</tr>
			)}
			</tbody>
		</table>
	);
}