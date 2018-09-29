class App extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      newTask: "",
      tasks: []
    };

    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.handleAddTaskFormSubmit = this.handleAddTaskFormSubmit.bind(this);

    this.handleMoveToTodo = this.handleMoveToTodo.bind(this);
    this.handleMoveToDoing = this.handleMoveToDoing.bind(this);
    this.handleMoveToFinished = this.handleMoveToFinished.bind(this);
  }

  handleNewTaskChange(e) {
    this.setState({
      newTask: e.target.value
    });
  }

  handleAddTaskFormSubmit(e) {
    e.preventDefault();

    this.setState(prevState => {
      return {
        tasks: [
          ...prevState.tasks,
          { description: prevState.newTask, status: 0 , id: prevState.counter}
        ],
        newTask: "",
        counter: prevState.counter + 1,
      };
    });
  }

  handleMoveToTodo(id) {
    this.setState(prevState => {
      const tasks = [...prevState.tasks];
      tasks.filter(task => task.id === id)[0].status = 0;

      return { tasks };
    });
  }

  handleMoveToDoing(id) {
    this.setState(prevState => {
      const tasks = [...prevState.tasks];
      tasks.filter(task => task.id === id)[0].status = 1;

      return { tasks };
    });
  }

  handleMoveToFinished(id) {
    this.setState(prevState => {
      const tasks = [...prevState.tasks];
      tasks.filter(task => task.id === id)[0].status = 2;

      return { tasks };
    });
  }

  render() {
    let todoColumn;
    let doingColumn;
    let finishedColumn;

    if (this.state.tasks.filter(task => task.status === 0).length > 0) {
      todoColumn = (
        <ul className="list-group-flush">
          {this.state.tasks
            .filter(task => task.status === 0)
            .map((task, index) => (
              <TodoTask
                key={index}
                task={task}
                handleMoveToDoing={this.handleMoveToDoing}
              />
            ))}
        </ul>
      );
    } else {
      todoColumn = <p>No tasks in this column</p>;
    }

    if (this.state.tasks.filter(task => task.status === 1).length > 0) {
      doingColumn = (
        <ul className="list-group-flush">
          {this.state.tasks
            .filter(task => task.status === 1)
            .map((task, index) => (
              <DoingTask
                key={index}
                task={task}
                handleMoveToTodo={this.handleMoveToTodo}
                handleMoveToFinished={this.handleMoveToFinished}
              />
            ))}
        </ul>
      );
    } else {
      doingColumn = <p>No tasks in this column</p>;
    }

    if (this.state.tasks.filter(task => task.status === 2).length > 0) {
      finishedColumn = (
        <ul className="list-group-flush">
          {this.state.tasks
            .filter(task => task.status === 2)
            .map((task, index) => (
              <FinishedTask
                key={index}
                task={task}
                handleMoveToDoing={this.handleMoveToDoing}
              />
            ))}
        </ul>
      );
    } else {
      finishedColumn = <p>No tasks in this column</p>;
    }

    return (
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">React Todo List</h1>
        </div>

        <div className="card-body">
          <form className="mb-4" onSubmit={this.handleAddTaskFormSubmit}>
            <div className="input-group mb-3 col-10 offset-1">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                required
                onChange={this.handleNewTaskChange}
                value={this.state.newTask}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col text-center">
              <h2>Todo</h2>

              {todoColumn}
            </div>

            <div className="col text-center">
              <h2>Doing</h2>

              {doingColumn}
            </div>

            <div className="col text-center">
              <h2>Finished</h2>

              {finishedColumn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
