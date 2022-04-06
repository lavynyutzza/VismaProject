import React from "react";
import { Component } from "react";
import ProjectService from "../api/ProjectService";
import ActivitiesTable from "../components/ActivitiesTable";

export default class ActivitiesList extends Component<any, any> {
    constructor(props){
        super(props);

        this.getAllActivities = this.getAllActivities.bind(this);

        this.state = {
            activities: [],
            isReady: false,
            projectId: this.props.projectId
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.projectId !== this.props.projectId) {
            this.setState({
                projectId: this.props.projectId
            });
            this.getAllActivities(this.state.projectId);
        }
    }

    getAllActivities(id) {
        ProjectService.getProjectActivities(id)
          .then(response => {
            this.setState({
              activities: response,
              isReady: true
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

      render() {
        const {activities, isReady} = this.state;

        if(!isReady) return null;
    
        return (
            <>
                {/* <div className="flex items-center my-6">
                    <div className="w-1/2">
                        <AddProject/>
                    </div>
    
                    <div className="w-1/2 flex justify-end">
                        <form>
                            <input className="border rounded-full py-2 px-4" type="search" placeholder="Search" aria-label="Search" />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit">Search</button>
                        </form>
                    </div>
                </div> */}

                <div className="col-md-6">
                    <ActivitiesTable data = {activities}/>
                </div>
            </>
        );
    }
}