import { useDispatch } from "react-redux";
import { Fragment } from "react";
import {
	removeOneNotepadItem,
	updateCompletionStatusOfNotepadItem,
} from "../../store/notepads/notepad-item-actions";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskLayout = props => {
	const dispatch = useDispatch();

	const onChangeHandler = () =>
		dispatch(
			updateCompletionStatusOfNotepadItem(
				props.notepadId,
				props.itemId,
				!props.completionStatus
			)
		);

	const removeHandler = () => {
		dispatch(removeOneNotepadItem(props.notepadId, props.itemId));
	};

	const completedTask = props.completionStatus ? classes["completed-task"] : "";

	return (
		<Fragment>
			<div className={classes["task-container"]}>
				<input
					className={classes["complete-checkbox"]}
					onChange={onChangeHandler}
					type="checkbox"
					id={props.item}
					name={props.item}
					checked={props.completionStatus}
				/>
				<label htmlFor={props.item}>
					<span className={`${classes.task} ${completedTask}`}>
						{props.item}
					</span>
				</label>
			</div>
			<div className={classes["btn-container"]}>
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
