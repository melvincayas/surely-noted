import React, { useState, useContext } from "react";
import classes from "./styles/ItemCard.module.css";
import Button from "../../UI/Button";
import { ListContext } from "../../../store/ListProvider";

const ItemCard = ({ listId, itemId, item }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(item);
	const [done, setDone] = useState(null);

	const { setLists } = useContext(ListContext);

	const removeHandler = async () => {
		try {
			const result = await fetch(`/list/${listId}/${itemId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { response } = await result.json();

			if (response.type === "success") {
				setLists(response.lists);
			}
		} catch (err) {
			console.log(err);
		}
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

		const request = {
			editedContent: editContent,
		};

		try {
			const result = await fetch(`/list/${listId}/${itemId}`, {
				method: "PATCH",
				body: JSON.stringify(request),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { response } = await result.json();

			if (response.type === "success") {
				setLists(response.lists);
			}
		} catch (err) {
			console.log(err);
		}

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
		<React.Fragment>
			<div onClick={doneHandler} className={classes.width}>
				<p className={`${classes.todo} ${done}`}>{item}</p>
			</div>
			<div className={classes.buttons}>
				<Button
					className={`${classes.edit} ${classes.button}`}
					clickHandler={editHandler}
				>
					<i class="fas fa-edit"></i>
				</Button>
				<Button
					className={`${classes.trash} ${classes.button}`}
					clickHandler={removeHandler}
				>
					<i class="fas fa-trash-alt"></i>
				</Button>
			</div>
		</React.Fragment>
	);

	return (
		<div className={classes.container}>
			{isEditing && editForm}
			{!isEditing && notEditingLayout}
		</div>
	);
};

export default ItemCard;
