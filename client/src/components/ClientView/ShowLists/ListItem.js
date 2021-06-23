import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOneList } from "../../../store/lists/list-actions";
import Button from "../../UI/Button";
import classes from "./styles/ListItem.module.css";

const ListItem = props => {
	const dispatch = useDispatch();
	const history = useHistory();

	const clickHandler = () => {
		history.push(`/list/${props.id}`);
	};

	const trashHandler = () => {
		dispatch(deleteOneList(props.id));
	};

	return (
		<div className={classes.container}>
			<div className={classes.context} onClick={clickHandler}>
				<span>{props.title}</span>
			</div>
			<Button className={classes.trash} clickHandler={trashHandler}>
				<i className="fas fa-trash-alt"></i>
			</Button>
		</div>
	);
};

export default ListItem;
