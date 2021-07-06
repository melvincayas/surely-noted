import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInputValidation from "../../../hooks/useInputValidation";
import { createOneNotepad } from "../../../store/notepads/notepad-actions";
import { errorActions } from "../../../store/error/error-slice";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import formClasses from "../../../styles/Auth/Forms.module.css";
import inputClasses from "../../../styles/UI/Input.module.css";
import modalClasses from "../../../styles/UI/Modal.module.css";

const NewNotepad = props => {
	const {
		inputChangeHandler: titleChangeHandler,
		inputBlurHandler: titleBlurHandler,
		value: title,
		inputError: titleHasError,
	} = useInputValidation(input => input.trim() !== "");
	const {
		inputChangeHandler: categoryChangeHandler,
		inputBlurHandler: categoryBlurHandler,
		value: category,
		inputError: categoryHasError,
	} = useInputValidation(input => input.trim() !== "");
	const dispatch = useDispatch();
	const history = useHistory();

	const formHandler = async event => {
		props.listToggler(event);
		event.preventDefault();

		if (titleHasError || categoryHasError) {
			return dispatch(
				errorActions.setError({
					header: "Error",
					message: "Please fill out all the details.",
				})
			);
		}

		const newList = {
			title,
			category,
		};

		dispatch(createOneNotepad(newList));
		history.push("/home");
	};

	return (
		<Modal header="New Notepad">
			<form onSubmit={formHandler} className={formClasses.form} method="POST">
				<Input
					label="Title (required)"
					id="title"
					name="title"
					type="text"
					placeholder="ex: New Clothes"
					className={titleHasError ? inputClasses["input-invalid"] : ""}
					onBlurHandler={titleBlurHandler}
					onChangeHandler={titleChangeHandler}
				/>
				<Input
					label="Category (optional)"
					id="category"
					name="category"
					type="text"
					placeholder="ex: Vacation"
					className={categoryHasError ? inputClasses["input-invalid"] : ""}
					onBlurHandler={categoryBlurHandler}
					onChangeHandler={categoryChangeHandler}
				/>
				<div className={modalClasses["btn-container"]}>
					<Button>Create</Button>
					<Button clickHandler={props.listToggler}>Cancel</Button>
				</div>
			</form>
		</Modal>
	);
};

export default NewNotepad;
