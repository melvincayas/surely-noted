import { useDispatch } from "react-redux";
import useInputValidation from "../../hooks/useInputValidation";
import { editOneNotepad } from "../../store/notepads/notepad-actions";
import { errorActions } from "../../store/error/error-slice";
import GeneralModal from "../UI/GeneralModal";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "../../styles/Auth/Forms.module.css";
import inputStyles from "../../styles/UI/Input.module.css";

const EditNotepad = ({ id, title, category, modalToggler }) => {
	const {
		inputChangeHandler: titleChangeHandler,
		inputBlurHandler: titleBlurHandler,
		value: editedTitle,
		inputError: titleHasError,
	} = useInputValidation(input => input.trim() !== "", title);
	const {
		inputChangeHandler: categoryChangeHandler,
		inputBlurHandler: categoryBlurHandler,
		value: editedCategory,
		inputError: categoryHasError,
	} = useInputValidation(input => input.trim() !== "", category);

	const dispatch = useDispatch();

	const formHandler = async event => {
		modalToggler(event);
		event.preventDefault();

		if (titleHasError || categoryHasError) {
			return dispatch(
				errorActions.setError({
					header: "Error",
					message: "Please fill out all the details.",
				})
			);
		}

		const editedNotepad = {
			title: editedTitle,
			category: editedCategory,
		};

		dispatch(editOneNotepad(editedNotepad, id));
	};

	return (
		<GeneralModal header="Edit Notepad">
			<form onSubmit={formHandler} className={classes.form} method="POST">
				<Input
					label="Title (required)"
					id="title"
					name="title"
					type="text"
					value={editedTitle}
					placeholder="ex: New Clothes"
					className={titleHasError ? inputStyles["input-invalid"] : ""}
					onBlurHandler={titleBlurHandler}
					onChangeHandler={titleChangeHandler}
				/>
				<Input
					label="Category (optional)"
					id="category"
					name="category"
					type="text"
					value={editedCategory}
					placeholder="ex: Vacation"
					className={categoryHasError ? inputStyles["input-invalid"] : ""}
					onBlurHandler={categoryBlurHandler}
					onChangeHandler={categoryChangeHandler}
				/>
				<div className={classes.container}>
					<Button>Create</Button>
					<Button clickHandler={modalToggler}>Close</Button>
				</div>
			</form>
		</GeneralModal>
	);
};

export default EditNotepad;
