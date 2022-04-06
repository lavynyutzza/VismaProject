import React from "react";
import { Component } from "react";
import ProjectService from "../api/ProjectService";
import ActivitiesList from "./ActivitiesList";

export default class ProjectDetails extends Component<any, any> {
    private params: any;

    constructor(props){
        super(props);
        this.updateProject = this.updateProject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.getProjectById = this.getProjectById.bind(this);

        this.state = {
            currentProject: {
                id: null,
                name: null,
                description: null
            }
        };
    }

    async componentDidMount() {
        this.getParams();
        this.getProjectById(this.params.match.params.id);
    }

    getParams = () => {
        this.params = this.props;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                id: this.params.match.params.id
            }
        }))
    };

    getProjectById(id) {
        ProjectService.getProject(id)
          .then(response => {
            this.setState({
                currentProject: response
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    updateProject() {
        const project = this.state.currentProject;
        console.log(project.id);

        ProjectService.UpdateProject(project)
        .then( response => {
            console.log(JSON.stringify(response));
            })
        .catch(e => {
                console.log(e);
            })
    }

    onChangeName(e) {
        const newName = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                name: newName
            }
        }));
    }

    render() { 
        const project = this.state.currentProject;

        return (
            <>
                <form >	
                    <label htmlFor='name'>Name</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Name" id="name" defaultValue={project.name} onChange={this.onChangeName}/>
                    <br></br>

                    <label htmlFor='description'>Description</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" defaultValue={project.description}/>
                    <br></br>

                    <label htmlFor='deadline'>Deadline</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Deadline" id="deadline" defaultValue={project.deadline}/>
                    <br></br>

                    <label htmlFor='clientName'>Client Name</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="ClientName" id="clientName" defaultValue={project.clientName}/>
                    <br></br>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.updateProject}>Update</button>
                </form>

                <ActivitiesList projectId = {project.id}></ActivitiesList>
            </>
        );
    }
}