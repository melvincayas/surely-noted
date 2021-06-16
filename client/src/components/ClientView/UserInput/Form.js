import { Fragment, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { errorActions } from "../../../store/error-slice";
import Button from "../../UI/Button";
import { ListContext } from "../../../store/ListProvider";

import classes from "./Form.module.css";

const Form = ({ id }) => {
	const [input, setInput] = useState("");

	const dispatch = useDispatch();

	const listCtx = useContext(ListContext);

	const inputHandler = event => {
		setInput(event.target.value);
	};

	const submitHandler = async event => {
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

		const item = {
			content: input,
		};

		const result = await fetch(`/list/${id}/add`, {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const { response } = await result.json();

		if (response.type === "success") {
			listCtx.setLists(response.lists);
		} else {
			dispatch(
				errorActions.setError({
					header: "Error",
					message: response.message,
				})
			);
		}

		setInput("");
	};

	return (
		<Fragment>
			<form onSubmit={submitHandler}>
				<input type="text" value={input} onChange={inputHandler}></input>
				<Button>Add</Button>
			</form>
		</Fragment>
	);
};

export default Form;
