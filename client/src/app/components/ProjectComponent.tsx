import React from "react";
import Collapsible from "./Collapsible";

export default function ProjectComponent(props) {

        const project = props.project;
        const deadLineString = new Date(project.deadline).toISOString().substring(0, 10);
        
        return (
            <>
                <Collapsible title={props.sectionTitle}>
                    <form >	
                        <label htmlFor='name'>Name</label>
                        <input className="border rounded-full py-2 px-4" type="text" minLength={3} aria-label="Name" id="name" defaultValue={project.name} onChange={props.onChangeName}/>
                        <br></br>

                        <label htmlFor='description'>Description</label>
                        <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" defaultValue={project.description} onChange={props.onChangeDescription}/>
                        <br></br>

                        <label htmlFor='deadline'>Deadline</label>
                        <input className="border rounded-full py-2 px-4" type="date" aria-label="Deadline"  id="deadline" value={deadLineString} onChange={props.onChangeDeadline}/>
                        <br></br>

                        <label htmlFor='clientName'>Client Name</label>
                        <input className="border rounded-full py-2 px-4" type="text" aria-label="ClientName" id="clientName" defaultValue={project.clientName} onChange={props.onChangeClientName}/>
                        <br></br>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={props.onClickAction}>{props.clickActionName}</button>
                    </form>
                </Collapsible>
            </>
        );
}