import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
	removeOneNotepadItem,
	editOneNotepadItem,
} from "../../store/notepads/notepad-item-actions";
import useEdit from "../../hooks/useEdit";
import Button from "../UI/Button";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskCard = ({ notepadId, itemId, item }) => {
	const {
		isEditing,
		setIsEditing,
		editedContent,
		editStatusHandler,
		editContentHandler,
	} = useEdit(item);

	const [done, setDone] = useState(null);

	const dispatch = useDispatch();

	const removeHandler = () => {
		dispatch(removeOneNotepadItem(notepadId, itemId));
	};

	const doneHandler = () => {
		if (done) return setDone(null);
		setDone(classes.done);
	};

	const editFormHandler = async event => {
		event.preventDefault();
		dispatch(editOneNotepadItem(notepadId, itemId, editedContent));
		setIsEditing(prevIsEditing => !prevIsEditing);
	};

	const editForm = (
		<form className={classes["edit-form"]} onSubmit={editFormHandler}>
			<input
				type="text"
				value={editedContent}
				onChange={editContentHandler}
			></input>
			<button>Save</button>
			<button onClick={editStatusHandler}>Close</button>
		</form>
	);

	const notEditingLayout = (
		<Fragment>
			<div onClick={doneHandler} className={classes.width}>
				<p className={`${classes.todo} ${done}`}>{item}</p>
			</div>
			<div className={classes.buttons}>
				<Button
					className={`${classes.edit} ${classes.button}`}
					clickHandler={editStatusHandler}
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

	return (
		<div className={classes.container}>
			{isEditing && editForm}
			{!isEditing && notEditingLayout}
		</div>
	);
};

export default TaskCard;
