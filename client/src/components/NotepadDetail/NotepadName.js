import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadName = ({ title, category, shared }) => {
	const isSharedNotepad = shared.length > 0;

	const sharedNotepadButton = <button>shared</button>;

	return (
		<div>
			<h1 className={classes.title}>
				{title} {isSharedNotepad && sharedNotepadButton}
			</h1>
			<h3 className={classes.subtitle}>{category}</h3>
		</div>
	);
};

export default NotepadName;
