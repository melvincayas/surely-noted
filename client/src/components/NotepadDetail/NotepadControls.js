import SettingsDropdownMenu from "./SettingsDropdownMenu";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadControls = ({ addTaskHandler, addTaskBtnClass }) => {
	return (
		<div className={classes["notepad-action-btns"]}>
			<button onClick={addTaskHandler}>
				<i className={addTaskBtnClass}></i>
			</button>
			<SettingsDropdownMenu />
		</div>
	);
};

export default NotepadControls;
