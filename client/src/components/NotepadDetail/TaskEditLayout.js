import { useDispatch } from "react-redux";
import { editOneNotepadItem } from "../../store/notepads/notepad-item-actions";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskEditLayout = props => {
	const dispatch = useDispatch();

	const editFormHandler = event => {
		event.preventDefault();
		dispatch(
			editOneNotepadItem(props.notepadId, props.itemId, props.editedContent)
		);
		props.setIsEditing(prevIsEditing => !prevIsEditing);
	};

	return (
		<form className={classes["edit-form"]} onSubmit={editFormHandler}>
			<input
				type="text"
				value={props.editedContent}
				onChange={props.editContentHandler}
			></input>
			<button>Save</button>
			<button onClick={props.editStatusHandler}>Close</button>
		</form>
	);
};

export default TaskEditLayout;
