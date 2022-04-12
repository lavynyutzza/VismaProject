import React, { Component } from "react";
import ActivityService from "../api/ActivityService";
import Collapsible from "../components/Collapsible";

export default class AddActivity extends Component<any, any> {
    constructor(props){
        super(props);
        this.saveActivity = this.saveActivity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);

        this.state = {
            name: null,
            projectId: this.props.projectId,
            description: null,
            hoursSpent: 0
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.projectId !== this.props.projectId) {
            this.setState({
                projectId: this.props.projectId
            });
            console.log(this.state);
        }
    }

    saveActivity() {
        const data = this.state;

        if(this.validateData(data)){
            ActivityService.InsertActivity(data)
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

    onChangeHours(e) {
        this.setState({
            hoursSpent: e.target.valueAsNumber
        });
        console.log(this.state);
    }

    validateData(data) {
        return this.validateName(data.name) &&
        this.validateHoursSpent(data.hoursSpent);
    }

    validateName(name: string) {
        if(!name){
            alert("The activity name is invalid!");
            return false;
        }
        return true;
    }

    validateHoursSpent(hours: number) {
        if(!hours){
            alert("The number of hours is invalid!");
            return false;
        }
        if(hours < 0){
            alert("The number of hours is invalid!");
            return false;
        }

        return true;
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
                    <input className="border rounded-full py-2 px-4" type="text" aria-label="Description" id="description" onChange={this.onChangeDescription}/>
                    <br></br>

                    <label htmlFor='hoursSpent'>Hours Spent</label>
                    <input className="border rounded-full py-2 px-4" type="number" aria-label="Hours Spent" id="hoursSpent" onChange={this.onChangeHours}/>
                    <br></br>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" type="submit" onClick={this.saveActivity}>Add</button>
                </form>
            </Collapsible>
            </>
        );
    }
}