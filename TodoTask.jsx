const TodoTask = (props) => {
    return (
        <li className="list-group-item card-text">
            { props.task.description } <a className="text-primary">&raquo;</a>
        </li>
    );
};