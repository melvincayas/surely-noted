import React from "react";
import classes from "./styles/Card.module.css";

const Card = props => {
	return (
		<div className={`${classes.card} ${props.className}`}>
			<h1 className={classes.header}>{props.header}</h1>
			<section className={classes.content}>{props.children}</section>
		</div>
	);
};

export default Card;
