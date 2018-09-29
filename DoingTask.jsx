const DoingTask = props => {
  return (
    <li className="list-group-item card-text">
      <a
        className="text-primary"
        onClick={() => props.handleMoveToTodo(props.index)}
      >
        &laquo;
      </a>{" "}
      {props.task.description}{" "}
      <a
        className="text-primary"
        onClick={() => props.handleMoveToFinished(props.index)}
      >
        &raquo;
      </a>
    </li>
  );
};
