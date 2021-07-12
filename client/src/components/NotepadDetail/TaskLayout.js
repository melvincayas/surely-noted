import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { removeOneNotepadItem } from "../../store/notepads/notepad-item-actions";
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
				<input type="checkbox" id={props.item} name={props.item} />
				<label htmlFor={props.item}>
					<span className={`${classes.todo} ${props.done}`}>{props.item}</span>
				</label>
			</div>
			<div className={classes.buttons}>
				<button
					className={`${classes.edit} ${classes.button}`}
					onClick={props.editStatusHandler}
				>
					<i className="fas fa-edit"></i>
				</button>
				<button
					className={`${classes.trash} ${classes.button}`}
					onClick={removeHandler}
				>
					<i className="fas fa-trash-alt"></i>
				</button>
			</div>
		</Fragment>
	);
};

export default TaskLayout;
