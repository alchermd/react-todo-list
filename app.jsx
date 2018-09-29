class App extends React.Component {
  constructor() {
    super();

    this.state = {
      newTask: "",
      tasks: []
    };

    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.handleAddTaskFormSubmit = this.handleAddTaskFormSubmit.bind(this);
    this.handleMoveToDoing = this.handleMoveToDoing.bind(this);
    this.handleMoveToTodo = this.handleMoveToTodo.bind(this);
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
          { description: prevState.newTask, status: 0 }
        ],
        newTask: ""
      };
    });
  }

  handleMoveToDoing(index) {
    const tasks = this.state.tasks;
    tasks[index].status = 1;

    this.setState({ tasks });
  }

  handleMoveToTodo(index) {
    const tasks = this.state.tasks;
    tasks[index].status = 0;

    this.setState({ tasks });
  }

  handleMoveToFinished(index) {
    const tasks = this.state.tasks;
    tasks[index].status = 2;

    this.setState({ tasks });
  }

  render() {
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

              <ul className="list-group-flush">
                {this.state.tasks
                  .filter(task => task.status === 0)
                  .map((task, index) => (
                    <TodoTask
                      key={index}
                      index={index}
                      task={task}
                      handleMoveToDoing={this.handleMoveToDoing}
                    />
                  ))}
              </ul>
            </div>

            <div className="col text-center">
              <h2>Doing</h2>

              <ul className="list-group-flush">
                {this.state.tasks
                  .filter(task => task.status === 1)
                  .map((task, index) => (
                    <DoingTask
                      key={index}
                      index={index}
                      task={task}
                      handleMoveToTodo={this.handleMoveToTodo}
                      handleMoveToFinished={this.handleMoveToFinished}
                    />
                  ))}
              </ul>
            </div>

            <div className="col text-center">
              <h2>Finished</h2>

              <ul className="list-group-flush">
                {this.state.tasks
                  .filter(task => task.status === 2)
                  .map((task, index) => (
                    <FinishedTask
                      key={index}
                      index={index}
                      task={task}
                      handleMoveToDoing={this.handleMoveToDoing}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
