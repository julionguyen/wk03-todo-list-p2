import { Component } from "react";
import "./Todo.css"

export default class Todo extends Component {
    render() {
        return (
            this.props.completed 
                ? 
                <div className="todo_completed_bar">
                    <div className="todo_urgent">{this.props.urgent ? '🚨' : '🕒'}</div>
                    <div className="todo_item">{this.props.todo}</div>
                    <div className="todo_completed">
                        <input type="checkbox" 
                                checked={this.props.completed}
                                onChange={this.props.handleJobCompletion}
                        />
                    </div>
                </div>    
                :
                <div className="todo_incompleted_bar">
                    <div className="todo_urgent">{this.props.urgent ? '🚨' : '🕒'}</div>
                    <div className="todo_item">{this.props.todo}</div>
                    <div className="todo_completed">
                        <input type="checkbox" 
                            checked={this.props.completed} 
                            onChange={this.props.handleJobCompletion}
                        />
                    </div>
                </div>    
        )
    }
}