import classes from "./styles/NotepadLayout.module.css";

const NotepadLayout = props => {
	const addTaskHandler = () => {
		alert("clicked");
	};

	return (
		<div className={`${classes.notepad} ${props.className}`}>
			<div className={classes.header}>
				<div>
					<h1 className={classes.title}>{props.title}</h1>
					<h3 className={classes.subtitle}>{props.category}</h3>
				</div>
				<div className={classes["notepad-action-btns"]}>
					<i className="fas fa-plus-square"></i>
				</div>
			</div>
			<section>{props.children}</section>
		</div>
	);
};

export default NotepadLayout;
