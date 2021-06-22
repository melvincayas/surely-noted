import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listsActions } from "../../../store/lists/lists-slice";
import { deleteOneList } from "../../../store/lists/list-actions";
import Button from "../../UI/Button";
import classes from "./styles/ListItem.module.css";

const ListItem = props => {
	const dispatch = useDispatch();

	const clickHandler = () => {
		dispatch(
			listsActions.viewList({
				id: props.id,
			})
		);
	};

	const trashHandler = () => {
		dispatch(deleteOneList(props.id));
	};

	return (
		<div className={classes.container}>
			<Link to={`/list/${props.id}`}>
				<div className={classes.context}>
					<span>{props.title}</span>
				</div>
			</Link>
			<Button className={classes.trash} clickHandler={trashHandler}>
				<i className="fas fa-trash-alt"></i>
			</Button>
		</div>
	);
};

export default ListItem;
