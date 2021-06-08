import React, { useState, useContext } from "react";
import Button from "../../UI/Button";
import classes from "./Form.module.css";
import Modal from "../../UI/InfoModal";
import { ErrorContext } from "../../../store/ErrorProvider";
import { ListContext } from "../../../store/ListProvider";

const Form = ({ id }) => {
	const [input, setInput] = useState("");

	const listCtx = useContext(ListContext);
	const { setIsError } = useContext(ErrorContext);

	const inputHandler = event => {
		setInput(event.target.value);
	};

	const submitHandler = async event => {
		event.preventDefault();

		if (input.trim() === "") {
			setInput("");
			return setIsError({
				message: "Please enter something to add.",
			});
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
			setIsError({ message: response.message });
		}

		setInput("");
	};

	return (
		<React.Fragment>
			<form onSubmit={submitHandler}>
				<input type="text" value={input} onChange={inputHandler}></input>
				<Button>Add</Button>
			</form>
		</React.Fragment>
	);
};

export default Form;
