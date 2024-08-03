import { Component } from "react";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import "./index.css";

class TodoTask extends Component {
  state = { editClicked: false, userEditedValue: "" };

  componentDidMount() {
    const { eachTodo } = this.props;
    this.setState({ userEditedValue: eachTodo.task });
  }
  OnClickDeleteTodo = () => {
    const { eachTodo, deleteTodo } = this.props;
    deleteTodo(eachTodo.id);
  };

  onClickCheckbox = () => {
    const { eachTodo, changeStatus } = this.props;
    changeStatus(eachTodo);
  };

  onclickEditTodo = () => {
    this.setState({ editClicked: true });
  };

  onChangeEditTodo = (event) => {
    this.setState({ userEditedValue: event.target.value });
  };

  enterChangeTodo = (event) => {
    const { userEditedValue } = this.state;
    const { eachTodo, changeEditedTodo } = this.props;
    if (event.key === "Enter") {
      changeEditedTodo(eachTodo, userEditedValue);
      this.setState({ editClicked: false });
    }
  };

  render() {
    const { editClicked, userEditedValue } = this.state;
    const { eachTodo } = this.props;
    const { id, task, isCompleted } = eachTodo;
    const activeTask = isCompleted ? "completed-ask" : "";

    return (
      <li className="todo-list-item" key={id}>
        <input
          type="checkbox"
          id={id}
          checked={isCompleted}
          className="todo-items-checkbox"
          onChange={this.onClickCheckbox}
        />
        <div className="todo-task-contianer">
          {editClicked ? (
            <input
              type="text"
              value={userEditedValue}
              onChange={this.onChangeEditTodo}
              className="edit-input-element"
              onKeyDown={this.enterChangeTodo}
            />
          ) : (
            <label htmlFor={id} className={`todo-task-text ${activeTask}`}>
              {task}
            </label>
          )}
        </div>
        <div className="delete-edit-btns-contianer">
          <button type="button" className="btn-icon">
            <FaRegEdit className="icons" onClick={this.onclickEditTodo} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={this.OnClickDeleteTodo}
          >
            <TiDeleteOutline className="icons icons-2" />
          </button>
        </div>
      </li>
    );
  }
}

export default TodoTask;
