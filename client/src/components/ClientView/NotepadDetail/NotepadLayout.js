import { useState } from "react";
import ItemInputForm from "./ItemInputForm";
import classes from "./styles/NotepadLayout.module.css";

const NotepadLayout = props => {
	const [isAdding, setIsAdding] = useState(false);

	const addTaskHandler = () => {
		setIsAdding(prevState => !prevState);
	};

	const addBtnClass = isAdding ? "fas fa-minus-square" : "fas fa-plus-square";

	return (
		<div className={`${classes.notepad} ${props.className}`}>
			<div className={classes.header}>
				<div>
					<h1 className={classes.title}>{props.title}</h1>
					<h3 className={classes.subtitle}>{props.category}</h3>
				</div>
				<div className={classes["notepad-action-btns"]}>
					<i onClick={addTaskHandler} className={addBtnClass}></i>
				</div>
			</div>
			{isAdding && <ItemInputForm listId={props.listId} />}
			<section>{props.children}</section>
		</div>
	);
};

export default NotepadLayout;
