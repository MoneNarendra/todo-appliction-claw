import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import Cookies from "js-cookie";

import Header from "../Header";
import TodoTask from "../TodoTask";

import Url from "../Url";

import "./index.css";

const filterList = [
  { id: "all", text: "All" },
  { id: "pending", text: "Pending" },
  { id: "completed", text: "Completed" },
];

class Home extends Component {
  state = {
    todo: "",
    todoList: [],
    activeFilter: "all",
  };

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${Url}/todo/allTodos/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ todoList: [...data] });
  };

  onInputAddTodo = (event) => {
    this.setState({ todo: event.target.value });
  };

  onClickAddTodo = async () => {
    const { todo } = this.state;
    if (todo !== "") {
      const jwtToken = Cookies.get("jwt_token");

      const newTodo = {
        id: uuidv4(),
        task: todo,
        isCompleted: false,
      };

      const url = `${Url}/todo/add/`;
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newTodo),
        method: "POST",
      };
      await fetch(url, options);
      this.setState({ todo: "" });
      this.getTodoList();
    }
  };

  deleteTodo = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${Url}/todo/delete/${id}/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "DELETE",
    };
    await fetch(url, options);
    this.getTodoList();
  };

  updateTodoAPICall = async (newTodo, todo) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${Url}/todo/update/${todo.id}/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newTodo),
      method: "PUT",
    };
    await fetch(url, options);
    this.getTodoList();
  };

  changeStatus = (todo) => {
    let newTodo = {
      task: todo.task,
      isCompleted: !todo.isCompleted,
    };
    this.updateTodoAPICall(newTodo, todo);
  };

  changeEditedTodo = (todo, editedTask) => {
    let newTodo = {
      task: editedTask,
      isCompleted: todo.isCompleted,
    };
    this.updateTodoAPICall(newTodo, todo);
  };

  addTaskByEnter = (event) => {
    if (event.key === "Enter") {
      this.onClickAddTodo();
    }
  };

  changeFilter = (id) => {
    this.setState({ activeFilter: id });
  };

  returnFilterButtons = () => {
    const { activeFilter } = this.state;
    return (
      <div className="filter-buttons-container">
        <ul className="filter-buttons">
          {filterList.map((eachFilter) => {
            const onClickFilter = () => {
              this.changeFilter(eachFilter.id);
            };
            return (
              <li key={eachFilter.id}>
                <button
                  type="button"
                  className={
                    activeFilter === eachFilter.id
                      ? "todo-filter-btns active-btn "
                      : "todo-filter-btns"
                  }
                  onClick={onClickFilter}
                >
                  {eachFilter.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  renderAddTodo = () => {
    const { todo } = this.state;
    return (
      <div className="add-todo-ele">
        <input
          type="text"
          className="add-input-ele"
          placeholder="Enter Todo"
          onChange={this.onInputAddTodo}
          value={todo}
          onKeyDown={this.addTaskByEnter}
        />
        <button type="add" className="add-button" onClick={this.onClickAddTodo}>
          Add
        </button>
      </div>
    );
  };

  getFilteredList = (todoList) => {
    const { activeFilter } = this.state;
    let modifiedList;
    if (activeFilter === filterList[0].id) {
      modifiedList = todoList;
    } else if (activeFilter === filterList[1].id) {
      modifiedList = todoList.filter((eachTodo) => eachTodo.isCompleted === 0);
    } else if (activeFilter === filterList[2].id) {
      modifiedList = todoList.filter((eachTodo) => eachTodo.isCompleted === 1);
    }
    return modifiedList;
  };

  render() {
    const { todoList } = this.state;
    const filteredList = this.getFilteredList(todoList);
    return (
      <>
        <Header />
        <div className="todo-bottom-container">
          <div className="todo-bottom-inner-container">
            {this.renderAddTodo()}
            {this.returnFilterButtons()}
            <div className="todo-list-bg-container">
              <ul className="todo-list-container">
                {filteredList.map((eachTodo) => (
                  <TodoTask
                    key={eachTodo.id}
                    eachTodo={eachTodo}
                    deleteTodo={this.deleteTodo}
                    changeStatus={this.changeStatus}
                    changeEditedTodo={this.changeEditedTodo}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
