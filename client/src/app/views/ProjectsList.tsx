import React from "react";
import { Component } from "react";
import ProjectService from "../api/ProjectService";
import ProjectsTable from "../components/ProjectsTable";

export default class ProjectsList extends Component<any, any> {
    constructor(props){
        super(props);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.state = {
            projects: [],
            isReady: false
        };
    }

    async componentDidMount() {
        this.getAllProjects();
    }


    getAllProjects() {
        ProjectService.getAll()
          .then(response => {
            this.setState({
              projects: response,
              isReady: true
            });
            console.log("response " + response);
          })
          .catch(e => {
            console.log(e);
          });
    }

      render() {
        const {projects, isReady} = this.state;
        console.log("isReady " + isReady);
    
        return (
            <>
                <div className="flex items-center my-6">
                    <div className="w-1/2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add entry</button>
                    </div>
    
                    <div className="w-1/2 flex justify-end">
                        <form>
                            <input className="border rounded-full py-2 px-4" type="search" placeholder="Search" aria-label="Search" />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit">Search</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-6">
                    <ProjectsTable data = {projects}/>

                </div>

            </>
        );
    }
}