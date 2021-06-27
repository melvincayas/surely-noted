import classes from "./styles/NotepadLayout.module.css";

const NotepadLayout = props => {
	return (
		<div className={`${classes.notepad} ${props.className}`}>
			<div className={classes.header}>
				<h1 className={classes.title}>{props.title}</h1>
				<h3 className={classes.subtitle}>{props.category}</h3>
			</div>
			<section>{props.children}</section>
		</div>
	);
};

export default NotepadLayout;
