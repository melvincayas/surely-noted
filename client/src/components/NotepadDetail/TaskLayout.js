import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { removeOneNotepadItem } from "../../store/notepads/notepad-item-actions";
import Button from "../UI/Button";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskLayout = props => {
	const [done, setDone] = useState(null);
	const dispatch = useDispatch();

	const doneHandler = () => {
		if (done) return setDone(null);
		setDone(classes.done);
	};

	const removeHandler = () => {
		dispatch(removeOneNotepadItem(props.notepadId, props.itemId));
	};

	return (
		<Fragment>
			<div onClick={doneHandler} className={classes.width}>
				<p className={`${classes.todo} ${props.done}`}>{props.item}</p>
			</div>
			<div className={classes.buttons}>
				<Button
					className={`${classes.edit} ${classes.button}`}
					clickHandler={props.editStatusHandler}
				>
					<i className="fas fa-edit"></i>
				</Button>
				<Button
					className={`${classes.trash} ${classes.button}`}
					clickHandler={removeHandler}
				>
					<i className="fas fa-trash-alt"></i>
				</Button>
			</div>
		</Fragment>
	);
};

export default TaskLayout;
