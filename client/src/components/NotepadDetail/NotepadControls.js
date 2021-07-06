import SettingsDropdownMenu from "./SettingsDropdownMenu";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadControls = ({
	id,
	title,
	category,
	addTaskHandler,
	addTaskBtnClass,
}) => {
	return (
		<div className={classes["notepad-action-btns-container"]}>
			<button className="notepad-action-btn" onClick={addTaskHandler}>
				<i className={addTaskBtnClass}></i>
			</button>
			<SettingsDropdownMenu id={id} title={title} category={category} />
		</div>
	);
};

export default NotepadControls;
