import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInputValidation from "../../../hooks/useInputValidation";
import { createOneNotepad } from "../../../store/notepads/notepad-actions";
import { errorActions } from "../../../store/error/error-slice";
import GeneralModal from "../../UI/GeneralModal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import classes from "../../../styles/Auth/Forms.module.css";
import inputStyles from "../../../styles/UI/Input.module.css";

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
		<GeneralModal header="New Notepad">
			<form onSubmit={formHandler} className={classes.form} method="POST">
				<Input
					label="Title (required)"
					id="title"
					name="title"
					type="text"
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
					placeholder="ex: Vacation"
					className={categoryHasError ? inputStyles["input-invalid"] : ""}
					onBlurHandler={categoryBlurHandler}
					onChangeHandler={categoryChangeHandler}
				/>
				<div className={classes.container}>
					<Button>Create</Button>
					<Button clickHandler={props.listToggler}>Close</Button>
				</div>
			</form>
		</GeneralModal>
	);
};

export default NewNotepad;
