import { Component } from "react";
import "./Todo.css"

export default class Todo extends Component {
    render() {
        return (
            <div className="todo_item">
                <li>{this.props.urgent && 'urgent 🚨: '} {this.props.desc}</li>
            </div>
        )
    }
}