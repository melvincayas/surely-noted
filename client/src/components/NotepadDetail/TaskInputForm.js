import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { errorActions } from "../../store/error/error-slice";
import { addOneNotepadItem } from "../../store/notepads/notepad-item-actions";
import classes from "../../styles/NotepadDetail/TaskInputForm.module.css";

const TaskInputForm = ({ id }) => {
	const [input, setInput] = useState("");

	const dispatch = useDispatch();

	const inputHandler = event => {
		setInput(event.target.value);
	};

	const submitHandler = event => {
		event.preventDefault();

		if (input.trim() === "") {
			setInput("");
			return dispatch(
				errorActions.setError({
					header: "Input Error",
					message: "Please enter something to add.",
				})
			);
		}

		dispatch(addOneNotepadItem(id, input));

		setInput("");
	};

	return (
		<Fragment>
			<form className={classes["item-input-form"]} onSubmit={submitHandler}>
				<input
					autoFocus
					placeholder="Enter a task"
					className={classes["item-input"]}
					type="text"
					value={input}
					onChange={inputHandler}
				></input>
				<button className={classes["submit-btn"]}>Add Task</button>
			</form>
		</Fragment>
	);
};

export default TaskInputForm;
