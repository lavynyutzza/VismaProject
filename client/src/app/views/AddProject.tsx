import React, { Component } from "react";
import ProjectService from "../api/ProjectService";
import ProjectComponent from "../components/ProjectComponent";

export default class AddProject extends Component {
    constructor(props){
        super(props);
        this.saveProject = this.saveProject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeClientName = this.onChangeClientName.bind(this);

        this.state = {
            name: null,
            description: null,
            deadline: new Date(),
            clientName: null
        };
    }

    saveProject() {
        const data = this.state;
        
        if(this.validateData(data)){
            ProjectService.InsertProject(data)
            .then( response => {
                console.log(JSON.stringify(response));
            })
            .catch(e => {
                    console.log(e);
            })
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
        console.log(this.state);
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
        console.log(this.state);
    }

    onChangeDeadline(e) {
        this.setState({
            deadline: e.target.value
        });
        console.log(this.state);
    }

    onChangeClientName(e) {
        this.setState({
            clientName: e.target.value
        });
        console.log(this.state);
    }

    validateData(data) {
        return this.validateName(data.name) &&
        this.validateDeadline(new Date(data.deadline));
    }

    validateName(name: string) {
        if(!name){
            alert("The project name is invalid!");
            return false;
        }
        return true;
    }

    validateDeadline(deadline: Date) {
        if(!deadline){
            alert("The deadline is invalid!");
            return false;
        }
        if(deadline <= new Date()){
            alert("The deadline cannot be in the past!");
            return false;
        }

        return true;
    }

    render() { 
        return (
            <>
                <ProjectComponent project={this.state} 
                    onChangeName={this.onChangeName} 
                    onChangeDescription={this.onChangeDescription}
                    onChangeDeadline={this.onChangeDeadline}
                    onChangeClientName={this.onChangeClientName}
                    onClickAction = {this.saveProject}
                    clickActionName = "Save project"
                    sectionTitle= "Add new project"
                    ></ProjectComponent>
            </>
        );
    }
}