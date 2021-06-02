import React from "react";
import Card from "../../UI/Card";
import ItemCard from "./ItemCard";
import classes from "./styles/List.module.css";

const List = ({ todos, liftRemove }) => {
	const emptyText = (
		<p className={classes["empty-text"]}>Enter items to get started!</p>
	);

	return (
		<Card header="To-Do List">
			{todos.length === 0 && emptyText}
			{todos.map(todo => (
				<ItemCard
					key={todo.id}
					id={todo.id}
					item={todo.item}
					liftRemove={liftRemove}
				/>
			))}
		</Card>
	);
};

export default List;
