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

    async saveProject() {
        const data = this.state;
        
        await ProjectService.InsertProject(data)
            .then((response) => {
                if(response.ok){
                    return null;
                }else{
                    return response.text()
                }
            })
            .then((text) => { 
                if(text){
                    alert(text);
                }
            })
            .catch((error) => {
                console.log(error);
            });
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