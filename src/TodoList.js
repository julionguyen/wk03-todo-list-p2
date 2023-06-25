import { Component } from "react";
import Todo from "./Todo"
import "./TodoList.css"
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";

export default class TodoList extends Component {
    state = {
        todoList: [
            {desc: "eat", urgent: false}, 
            {desc: "sleep", urgent: false}, 
            {desc: "do something new", urgent: true}, 
            {desc: "eat again", urgent: false}, 
            {desc: "sleep again", urgent: true}
        ],
        jobDescription: '',
        isUrgentJob: false,
        isShowUrgentOnly: false,
        txtSearch: ''        
    }

    handleAddJob = event => {
        let jobDescriptionSt = event.target.value
        this.setState({
            jobDescription: jobDescriptionSt
        })
    }

    doAddJob = () => {
        {this.state.jobDescription != '' && this.setState({
            todoList: [...this.state.todoList, {desc: this.state.jobDescription, urgent: this.state.isUrgentJob}],
            jobDescription: '',
            isUrgentJob: false
        })}
    }

    doClearAll = () => {

        this.setState({
            todoList: []
        })
        
    }

    doClearFirstJob = () => {
        
        this.setState({
            todoList: this.state.todoList.slice(1)
        })
    }
    handleSearchChange = event => {
        let txtSearchSt = event.target.value
        this.setState({
            txtSearch: txtSearchSt
        })
    }
    
    doSearch = () => {

        this.setState({
            todoList: this.state.todoList.filter(job_search=>job_search.desc.toLocaleLowerCase().includes(this.state.txtSearch)),
            txtSearch: ''
        })
        
    }
    handleUrgentOnly = event => {
        
        let isChecked = event.target.checked
        this.setState({
            isShowUrgentOnly: isChecked
        })
        
    }

    handleUrgentJob = event => {
        let isUrgentJobStatus = event.target.checked
        this.setState({
            isUrgentJob: isUrgentJobStatus
        })
    }
    render () {
        
        return (
            <div className="todo_main">                
                <div className="main_op">
                    <h3 className="page_title">Todo List</h3>
                    <div className="add_new_job">
                        <fieldset>
                            <legend>Add new job</legend>
                            <input type="text" className="input_add" 
                                onChange={this.handleAddJob}
                                value={this.state.jobDescription}
                            />
                            <label><input type="checkbox" onChange={this.handleUrgentJob}></input>urgent</label>
                            <button className="btn_add" onClick={this.doAddJob}>Add Job</button>
                        </fieldset>
                    </div>
                    <div className="clear_jobs">
                        <button className="btn_clear_all" onClick={this.doClearAll}>Clear All</button>
                        <button className="btn_clear_first_job" onClick={this.doClearFirstJob}>Clear First Job</button>
                        <label><input type="checkbox" className="input_urgent_only" 
                                    onChange={this.handleUrgentOnly} 
                                    checked={this.state.isShowUrgentOnly}
                                />Show urgent only
                        </label>
                    </div>
                    <div className="search_job">
                        <fieldset>
                            <legend>Search</legend>
                            <input type="text" onChange={this.handleSearchChange} value={this.state.txtSearch}/>
                            <button onClick={this.doSearch}>Search</button>
                        </fieldset>
                    </div>
                </div>
                <div className="todo_list_main">
                    {this.state.todoList.length < 1 ? <p className="todo_empty">Empty List</p> : 
                    this.state.isShowUrgentOnly ? this.state.todoList.filter(jobs=>(jobs.urgent)).map((job,index)=> <Todo key={this.state.isShowUrgentOnly+index} desc={job.desc} urgent={job.urgent}/>) :
                    this.state.todoList.sort((a,b)=>b.urgent-a.urgent).map((job,index) => <Todo key={this.state.isShowUrgentOnly+index} desc={job.desc} urgent={job.urgent}/>)}
                </div>
                
            </div>
        )
    }
}