import React, { Component } from "react";
import ProjectService from "../api/ProjectService";
import Collapsible from "../components/Collapsible";

export default class AddProject extends Component {
    constructor(props){
        super(props);
        this.saveProject = this.saveProject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);


        this.state = {
            name: null
        };
    }

    saveProject() {
        const data = this.state;
        console.log(data);

        ProjectService.InsertProject(data)
        .then( response => {
            console.log(JSON.stringify(response));
            })
        .catch(e => {
                console.log(e);
            })
      }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
        console.log(this.state);
    }

    render() { 
        return (
            <>
            <Collapsible title='Add entry'>
                <form >	
                    <label htmlFor='name'>Name</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Name" id="name" onChange={this.onChangeName}/>
                    <br></br>

                    <label htmlFor='description'>Description</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" />
                    <br></br>

                    <label htmlFor='deadline'>Deadline</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Deadline" id="deadline" />
                    <br></br>

                    <label htmlFor='clientName'>Client Name</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="ClientName" id="clientName" />
                    <br></br>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.saveProject}>Add</button>
                </form>
            </Collapsible>
            </>
        );
    }
}