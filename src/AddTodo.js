import { Component } from "react";
import "./AddTodo.css"

export default class AddTodo extends Component {
    state = {        
        jobTodo: '',
        isUrgentJob: false
    }

    doAddJob = () => {
        if (this.state.jobTodo != '') {
            this.props.doAddJob(
                {
                    todo: this.state.jobTodo,
                    urgent: this.state.isUrgentJob,
                    completed: false
                }
            )
            this.setState({                
                jobTodo: '',
                isUrgentJob: false    
            })
            
        }
    }
    
    handleAddJob = event => {
        
        let jobTodoSt = event.target.value
        this.setState({
            jobTodo: jobTodoSt
        })
    }
    
    handleUrgentJob = event => {
        
        let isUrgentJobStatus = event.target.checked

        this.setState({
            isUrgentJob: isUrgentJobStatus
        })
    }

    render() {
        return(
            <div className="add_new_job">
            <fieldset>
                <legend>Add new job</legend>
                <input type="text" className="input_add" 
                    onChange={this.handleAddJob}
                    value={this.state.jobTodo}
                />
                <label><input type="checkbox" checked={this.state.isUrgentJob} onChange={this.handleUrgentJob}></input>{this.state.isUrgentJob ? '🚨' : '🕒'}Urgent </label>
                <button className="btn_add" onClick={this.doAddJob}>Add Job</button>
            </fieldset>
        </div>
)
    }
}