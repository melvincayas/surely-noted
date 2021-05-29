import React, { useState } from "react";
import classes from "./styles/ItemCard.module.css";
import Button from "../UI/Button";

const ItemCard = ({ id, item, liftRemove }) => {
	const [toRemove, setToRemove] = useState(id);
	const [done, setDone] = useState(null);

	const clickHandler = () => {
		setToRemove(id);
		liftRemove(toRemove);
	};

	const doneHandler = () => {
		if (done) return setDone(null);
		setDone(classes.done);
	};

	return (
		<div onClick={doneHandler} className={classes.container}>
			<p className={`${classes.todo} ${done}`}>{item}</p>
			<Button className={classes.trash} clickHandler={clickHandler}>
				<i class="fas fa-trash-alt"></i>
			</Button>
		</div>
	);
};

export default ItemCard;
