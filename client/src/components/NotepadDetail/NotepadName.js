import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadName = ({ title, category }) => {
	return (
		<div>
			<h1 className={classes.title}>{title}</h1>
			<h3 className={classes.subtitle}>{category}</h3>
		</div>
	);
};

export default NotepadName;
