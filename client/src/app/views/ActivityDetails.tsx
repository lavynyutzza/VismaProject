import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import ActivityService from "../api/ActivityService";

export default class ProjectDetails extends Component<any, any> {
    private params: any;

    constructor(props){
        super(props);
        this.updateActivity = this.updateActivity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.getActivityById = this.getActivityById.bind(this);

        this.state = {
            currentActivity: {
                id: null,
                name: null,
                description: null,
                hoursSpent: null,
                projectId: 0
            },
            isReady: false
        };
    }

    async componentDidMount() {
        this.getParams();
        this.getActivityById(this.params.match.params.activityId);
    }

    getParams = () => {
        this.params = this.props;

        this.setState(prevState => ({
            currentActivity: {
                ...prevState.currentActivity,
                id: this.params.match.params.activityId,
                projectId: this.params.match.params.projectId,
            }
        }))
    };

    getActivityById(id) {
        ActivityService.getActivity(id)
          .then(response => {
            this.setState({
                currentActivity: response,
                isReady: true
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    async updateActivity() {
        const activity = this.state.currentActivity;

        await ActivityService.UpdateActivity(activity)
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
        const newName = e.target.value;

        this.setState(prevState => ({
            currentActivity: {
                ...prevState.currentActivity,
                name: newName
            }
        }));
    }

    onChangeDescription(e) {
        const newDesc = e.target.value;

        this.setState(prevState => ({
            currentActivity: {
                ...prevState.currentActivity,
                description: newDesc
            }
        }));
    }

    onChangeHours(e) {
        const newHours = e.target.valueAsNumber;

        this.setState(prevState => ({
            currentActivity: {
                ...prevState.currentActivity,
                hoursSpent: newHours
            }
        }));
    }

    render() { 
        const activity = this.state.currentActivity;

        return (
            <>
            <div>
                <form >	
                    <label htmlFor='name'>Name</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Name" id="name" defaultValue={activity.name} onChange={this.onChangeName}/>
                    <br></br>

                    <label htmlFor='description'>Description</label>
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" defaultValue={activity.description} onChange={this.onChangeDescription}/>
                    <br></br>

                    <label htmlFor='hoursSpent'>Hours Spent</label>
                    <input className="border rounded-full py-2 px-4" type="number" aria-label="Hours Spent" id="hoursSpent" defaultValue={activity.hoursSpent} onChange={this.onChangeHours}/>
                    <br></br>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.updateActivity}>Update Activity</button>
                </form>
            </div>   
            <div>
                <br></br>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" to={"/projects/" + activity.projectId}>Back to project view</Link>
            </div>   
            </>
        );
    }
}