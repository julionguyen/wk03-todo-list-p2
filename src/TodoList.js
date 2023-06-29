import { Component } from "react";
import Todo from "./Todo"
import "./TodoList.css"
import AddTodo from "./AddTodo";

export default class TodoList extends Component {
    state = {
        todoList: [
            {todo: "Buy more cat food", urgent: false, completed: true}, 
            {todo: "Clean the bathroom", urgent: false, completed: false}, 
            {todo: "Finish React homework", urgent: true, completed: true}, 
            {todo: "Go out for dinner", urgent: false, completed: false}, 
            {todo: "Finish assignment", urgent: true, completed: true}
        ],
        isShowUrgentOnly: false,
        txtSearch: ''        
    }


    doAddJob = (job) => {
        
        {job.todo != '' && this.setState({
            todoList: [...this.state.todoList, {todo: job.todo, urgent: job.urgent, completed: job.completed}]
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
    
    doClearCompletedJobs = () => {
        let completedJobs = []
        this.setState({
            todoList: this.state.todoList.filter(completedJob => ! completedJob.completed)
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
            todoList: this.state.todoList.filter(job_search=>job_search.todo.toLocaleLowerCase().includes(this.state.txtSearch)),
            txtSearch: ''
        })
        
    }

    handleUrgentOnly = event => {
        
        let isChecked = event.target.checked
        this.setState({
            isShowUrgentOnly: isChecked
        })
        
    }

    handleJobCompletion = (indexToChangeCompletion) => {
        
        let completedJobs = []
        
        this.state.todoList.map((job,index) =>
            index === indexToChangeCompletion 
                ?
                    <>                    
                        {job.completed = ! job.completed}
                        {completedJobs = [...completedJobs,job]}
                    </> 
                : completedJobs = [...completedJobs,job]
        )
        
        this.setState({
            todoList: completedJobs
        })
    }

    render () {
        
        return (
            <div className="todo_main">                
                <div className="main_job">
                    <h3 className="page_title">Todo List</h3>
                    <AddTodo doAddJob={this.doAddJob} />
                    <div className="clear_jobs">
                        <fieldset>
                            <legend>Clear Jobs</legend>
                            <button className="btn_clear_all" onClick={this.doClearAll}>All</button>
                            <button className="btn_clear_first_job" onClick={this.doClearFirstJob}>First Job</button>
                            <button className="btn_clear_completed_jobs" onClick={this.doClearCompletedJobs}>Completed Jobs</button>
                        </fieldset>
                    </div>
                    <div className="search_job">
                        <fieldset>
                            <legend>Search</legend>
                            <input type="text" onChange={this.handleSearchChange} value={this.state.txtSearch}/>
                            <button onClick={this.doSearch}>Search</button>
                        </fieldset>
                        <div className="show_urgent_only">
                            <label><input type="checkbox" className="input_urgent_only" 
                                            onChange={this.handleUrgentOnly} 
                                            checked={this.state.isShowUrgentOnly}
                                        />Show urgent only
                            </label>
                        </div>
                    </div>
                </div>
                <div className="todo_list_main">
                    {this.state.todoList.length < 1 ? <p className="todo_empty">Empty List</p> : 
                    this.state.isShowUrgentOnly ? this.state.todoList.filter(jobs=>(jobs.urgent)).map((job,index)=> 
                        <Todo key={index}
                                todo={job.todo} 
                                urgent={job.urgent}
                                completed={job.completed}
                                handleJobCompletion={()=>this.handleJobCompletion(index)}
                        />) :
                    this.state.todoList.sort((a,b)=>b.urgent-a.urgent).map((job,index) => 
                        <Todo key={index} 
                                todo={job.todo}
                                urgent={job.urgent}
                                completed={job.completed}
                                handleJobCompletion={()=>this.handleJobCompletion(index)}
                        />)}
                </div>
                
            </div>
        )
    }
}