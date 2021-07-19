import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadName = ({ title, category, shared }) => {
	const isSharedNotepad = shared.length > 0;

	const sharedNotepadButton = (
		<button className={classes["shared-notepad-badge"]}>shared</button>
	);

	return (
		<div>
			<div className={classes["title-container"]}>
				<h1 className={classes.title}>{title}</h1>
				{isSharedNotepad && sharedNotepadButton}
			</div>
			<h3 className={classes.subtitle}>{category}</h3>
		</div>
	);
};

export default NotepadName;
