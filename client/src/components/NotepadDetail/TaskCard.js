import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
	removeOneListItem,
	editOneListItem,
} from "../../store/lists/list-item-actions";
import Button from "../UI/Button";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskCard = ({ listId, itemId, item }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(item);
	const [done, setDone] = useState(null);

	const dispatch = useDispatch();

	const removeHandler = () => {
		dispatch(removeOneListItem(listId, itemId));
	};

	const editHandler = () => {
		setIsEditing(prevIsEditing => !prevIsEditing);
	};

	const doneHandler = () => {
		if (done) return setDone(null);
		setDone(classes.done);
	};

	const editContentHandler = event => {
		setEditContent(event.target.value);
	};

	const editFormHandler = async event => {
		event.preventDefault();
		dispatch(editOneListItem(listId, itemId, editContent));
		setIsEditing(prevIsEditing => !prevIsEditing);
	};

	const editForm = (
		<form className={classes["edit-form"]} onSubmit={editFormHandler}>
			<input
				type="text"
				value={editContent}
				onChange={editContentHandler}
			></input>
			<button>Save</button>
			<button onClick={editHandler}>Close</button>
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
					clickHandler={editHandler}
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
