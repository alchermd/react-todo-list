const FinishedTask = props => {
    return (
      <li className="list-group-item card-text">
        <a
          className="text-primary"
          onClick={() => props.handleMoveToDoing(props.task.id)}
        >
          &laquo;
        </a>{" "}
        {props.task.description}
      </li>
    );
  };
  