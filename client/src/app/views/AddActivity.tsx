import React, { Component } from "react";
import ActivityService from "../api/ActivityService";
import Collapsible from "../components/Collapsible";

export default class AddActivity extends Component<any, any> {
    constructor(props){
        super(props);
        this.saveActivity = this.saveActivity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);


        this.state = {
            name: null,
            projectId: this.props.projectId
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.projectId !== this.props.projectId) {
            this.setState({
                projectId: this.props.projectId
            });
            console.log(this.state);
            // this.getAllActivities(this.state.projectId);
        }
    }

    saveActivity() {
        const data = this.state;
        console.log(data);

        ActivityService.InsertActivity(data)
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
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Hours Spent" id="hoursSpent" />
                    <br></br>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.saveActivity}>Add</button>
                </form>
            </Collapsible>
            </>
        );
    }
}