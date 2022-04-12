import React from "react";
import { Component } from "react";
import ActivityService from "../api/ActivityService";
import ProjectService from "../api/ProjectService";
import ActivitiesTable from "../components/ActivitiesTable";

export default class ActivitiesList extends Component<any, any> {
    constructor(props){
        super(props);

        this.getAllActivities = this.getAllActivities.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);

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

    deleteActivity(id) {
        var confirmation = window.confirm("Are you sure you want to delete this activity?");
  
        if(confirmation === true) {
            ActivityService.DeleteActivity(id)
            .then(response => {
              if(response.ok) {
                this.setState({
                  isReady: false
                });
                this.getAllActivities(this.state.projectId);
              }
            })
            .catch(e => {
              console.log(e);
            });
        }    
      }

      render() {
        const {activities, isReady} = this.state;

        if(!isReady) return null;
    
        return (
            <>
                <div className="col-md-6">
                    <ActivitiesTable data = {activities} deleteActivity={this.deleteActivity}/>
                </div>
            </>
        );
    }
}