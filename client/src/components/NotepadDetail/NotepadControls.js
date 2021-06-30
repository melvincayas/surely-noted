import SettingsDropdownMenu from "./SettingsDropdownMenu";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadControls = ({ id, addTaskHandler, addTaskBtnClass }) => {
	return (
		<div className={classes["notepad-action-btns"]}>
			<button onClick={addTaskHandler}>
				<i className={addTaskBtnClass}></i>
			</button>
			<SettingsDropdownMenu id={id} />
		</div>
	);
};

export default NotepadControls;
