import React from "react";
import { Component } from "react";
import ProjectService from "../api/ProjectService";
import ProjectsTable from "../components/ProjectsTable";
import AddProject from "./AddProject";

export default class ProjectsList extends Component<any, any> {
    constructor(props){
        super(props);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.searchProjects = this.searchProjects.bind(this);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);

        this.state = {
            projects: [],
            isReady: false,
            searchName: null
        };
    }

    componentDidMount() {
        console.log(this.state);
        this.getAllProjects();
    }


    getAllProjects() {
        ProjectService.getAll()
          .then(response => {
            this.setState({
              projects: response,
              isReady: true
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;
        console.log(searchName);
    
        this.setState({
            searchName: searchName
        });
      }

    searchProjects(){
        console.log(this.state);

        ProjectService.searchProjectByName(this.state.searchName)
          .then(response => {
            this.setState({
              project: response,
              isReady: true
            });

            console.log(this.state);
            console.log(response);
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
                <div className="flex my-6 justify-between">
                    <div className="w-1/3">
                        <AddProject/>
                    </div> 
                    {/* <div className="w-1/3">
                        <form>
                            <input className="border rounded-full py-2 px-4" type="search" placeholder="Search" aria-label="Search" onChange={this.onChangeSearchName} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.searchProjects}>Search</button>
                        </form>
                    </div> */}
                </div>

                {isReady === true &&
                <>
                    <div className="col-md-6">
                        <ProjectsTable data = {projects}/>
                    </div>
                </>
                }
            </>
        );
    }
}