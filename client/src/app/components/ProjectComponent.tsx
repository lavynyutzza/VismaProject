import React, { Component } from "react";
import Collapsible from "./Collapsible";

export default class ProjectComponent extends Component<any, any> {
    constructor(props){
        super(props);
    }

    render() { 
        const project = this.props.project;
        const deadline = this.props.hasData ? new Date(project.deadline).toISOString().substring(0, 10) : "2022-01-01";
        console.log(deadline);

        return (
            <>
                <Collapsible title={this.props.sectionTitle}>
                    <form >	
                        <label htmlFor='name'>Name</label>
                        <input className="border rounded-full py-2 px-4" type="text" aria-label="Name" id="name" defaultValue={project.name} onChange={this.props.onChangeName}/>
                        <br></br>

                        <label htmlFor='description'>Description</label>
                        <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" defaultValue={project.description} onChange={this.props.onChangeDescription}/>
                        <br></br>

                        <label htmlFor='deadline'>Deadline</label>
                        <input className="border rounded-full py-2 px-4" type="date" aria-label="Deadline"  id="deadline" defaultValue={deadline} onChange={this.props.onChangeDeadline}/>
                        <br></br>

                        <label htmlFor='clientName'>Client Name</label>
                        <input className="border rounded-full py-2 px-4" type="text" aria-label="ClientName" id="clientName" defaultValue={project.clientName} onChange={this.props.onChangeClientName}/>
                        <br></br>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.props.onClickAction}>{this.props.clickActionName}</button>
                    </form>
                </Collapsible>
            </>
        );
    }
}