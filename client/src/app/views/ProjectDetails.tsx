import React from "react";
import { Component } from "react";
import ProjectService from "../api/ProjectService";
import ProjectComponent from "../components/ProjectComponent";
import ActivitiesList from "./ActivitiesList";
import AddActivity from "./AddActivity";

export default class ProjectDetails extends Component<any, any> {
    private params: any;

    constructor(props){
        super(props);
        this.updateProject = this.updateProject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeClientName = this.onChangeClientName.bind(this);
        this.getProjectById = this.getProjectById.bind(this);

        this.state = {
            currentProject: {
                id: null,
                name: null,
                description: null,
                deadline: null,
                clientName: null
            },
            isReady: false
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
                currentProject: response,
                isReady: true
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

    onChangeDescription(e) {
        const newDesc = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                description: newDesc
            }
        }));
    }

    onChangeDeadline(e) {
        const newDeadline = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                deadline: newDeadline
            }
        }));
    }

    onChangeClientName(e) {
        const newName = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                clientName: newName
            }
        }));
    }

    formatDate(date: string){
		return new Intl.DateTimeFormat("en-GB",
						{
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
                            timeZoneName: "short"
						}).format(new Date(date));
	}

    render() { 
        const project = this.state.currentProject;

        return (
            <>
                <div className="flex my-6 justify-between">
                    <div className="w-1/3">
                        <ProjectComponent project={project}
                            onChangeName={this.onChangeName} 
                            onChangeDescription={this.onChangeDescription}
                            onChangeDeadline={this.onChangeDeadline}
                            onChangeClientName={this.onChangeClientName}
                            onClickAction = {this.updateProject}
                            clickActionName = "Update project"
                            sectionTitle = "View or update project details"
                            ></ProjectComponent>
                    </div>
    
                    <div className="w-1/3">
                        <AddActivity projectId = {project.id}></AddActivity> 
                    </div>
                </div>

                <div className="col-md-6">
                    <ActivitiesList projectId = {project.id}></ActivitiesList> 
                </div>
            </>
        );
    }
}