import React from "react";
import classes from "./styles/NotepadLayout.module.css";

const Card = props => {
	return (
		<div className={`${classes.card} ${props.className}`}>
			<div className={classes.header}>
				<h1 className={classes.title}>{props.title}</h1>
				<h3 className={classes.subtitle}>{props.category}</h3>
			</div>
			<section className={classes.content}>{props.children}</section>
		</div>
	);
};

export default Card;
