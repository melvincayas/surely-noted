import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { editOneNotepad } from "../../store/notepads/notepad-actions";
import GeneralModal from "../UI/GeneralModal";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "../../styles/Auth/Forms.module.css";

const init = currentNotepadDetails => {
	return {
		title: currentNotepadDetails.title,
		titleValid: false,
		category: currentNotepadDetails.category,
		categoryValid: false,
	};
};

const inputReducer = (state, action) => {
	if (action.type === "TITLE_INPUT") {
		return {
			...state,
			title: action.title,
			titleValid: action.title.length > 0 && action.title.trim() !== "",
		};
	}
	if (action.type === "CATEGORY_INPUT") {
		return {
			...state,
			category: action.category,
			categoryValid:
				action.category.length > 0 && action.category.trim() !== "",
		};
	}
	return init(action.payload);
};

const EditNotepad = ({ id, title, category, modalToggler }) => {
	const currentNotepadDetails = { title, category };
	const [inputs, dispatchInputs] = useReducer(
		inputReducer,
		currentNotepadDetails,
		init
	);
	const dispatch = useDispatch();

	const titleHandler = event => {
		dispatchInputs({ type: "TITLE_INPUT", title: event.target.value });
	};

	const categoryHandler = event => {
		dispatchInputs({ type: "CATEGORY_INPUT", category: event.target.value });
	};

	const formHandler = async event => {
		modalToggler(event);
		event.preventDefault();

		const editedNotepad = {
			title: inputs.title,
			category: inputs.category,
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
					value={inputs.title}
					placeholder="ex: New Clothes"
					onChangeHandler={titleHandler}
				/>
				<Input
					label="Category (optional)"
					id="category"
					name="category"
					type="text"
					value={inputs.category}
					placeholder="ex: Vacation"
					onChangeHandler={categoryHandler}
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
