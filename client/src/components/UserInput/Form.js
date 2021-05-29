import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Form.module.css";
import Modal from "../UI/Modal";

const Form = props => {
	const [input, setInput] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		const id = setTimeout(() => {
			setIsValid(input.length > 0);
		}, 100);

		return () => {
			clearTimeout(id);
		};
	}, [input]);

	const inputHandler = event => {
		setInput(event.target.value);
	};

	const submitHandler = event => {
		event.preventDefault();

		if (input.trim() === "") {
			setInput("");
			return setIsError({
				header: "Empty Input",
				message: "Please enter content.",
			});
		}
		const todo = {
			id: Math.random(),
			item: input,
		};
		props.liftState(todo);
		setInput("");
	};

	const errorHandler = () => {
		setIsError(null);
	};

	return (
		<React.Fragment>
			{isError && (
				<Modal
					header={isError.header}
					message={isError.message}
					errorHandler={errorHandler}
				/>
			)}
			<Card header="Add To-Do's" className={classes.container}>
				<form onSubmit={submitHandler}>
					<input type="text" value={input} onChange={inputHandler}></input>
					<Button isValid={!isValid}>Add</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default Form;
