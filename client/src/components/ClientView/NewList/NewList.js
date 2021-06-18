import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { createOneList } from "../../../store/lists/list-actions";
import FormModal from "../../UI/FormModal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import classes from "../../Auth/Forms.module.css";

const defaultInputs = {
	title: "",
	titleValid: false,
	category: "",
	categoryValid: false,
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
	return defaultInputs;
};

const NewList = props => {
	const [inputs, dispatchInputs] = useReducer(inputReducer, defaultInputs);
	const dispatch = useDispatch();

	const titleHandler = event => {
		dispatchInputs({ type: "TITLE_INPUT", title: event.target.value });
	};

	const categoryHandler = event => {
		dispatchInputs({ type: "CATEGORY_INPUT", category: event.target.value });
	};

	const formHandler = async event => {
		props.listToggler(event);
		event.preventDefault();

		const newList = {
			title: inputs.title,
			category: inputs.category,
		};

		dispatch(createOneList(newList));
	};

	return (
		<FormModal header="New List">
			<form onSubmit={formHandler} className={classes.form} method="POST">
				<Input
					label="Title (required)"
					id="title"
					name="title"
					type="text"
					placeholder="ex: New Clothes"
					onChangeHandler={titleHandler}
				/>
				<Input
					label="Category (optional)"
					id="category"
					name="category"
					type="text"
					placeholder="ex: Vacation"
					onChangeHandler={categoryHandler}
				/>
				<div className={classes.container}>
					<Button>Create</Button>
					<Button clickHandler={props.listToggler}>Close</Button>
				</div>
			</form>
		</FormModal>
	);
};

export default NewList;
