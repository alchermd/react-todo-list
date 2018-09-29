const TodoTask = props => {
  return (
    <li className="list-group-item card-text">
      {props.task.description}{" "}
      <a
        className="text-primary"
        onClick={() => props.handleMoveToDoing(props.task.id)}
      >
        &raquo;
      </a>
    </li>
  );
};
