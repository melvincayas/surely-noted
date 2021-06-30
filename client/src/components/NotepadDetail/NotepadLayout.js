import { useState } from "react";
import TaskInputForm from "./TaskInputForm";
import NotepadName from "./NotepadName";
import SettingsDropdownMenu from "./SettingsDropdownMenu";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadLayout = props => {
	const [isAdding, setIsAdding] = useState(false);

	const addTaskHandler = () => setIsAdding(prevState => !prevState);

	const addBtnClass = isAdding ? "fas fa-minus-square" : "fas fa-plus-square";

	return (
		<div className={`${classes.notepad} ${props.className}`}>
			<div className={classes.header}>
				<NotepadName title={props.title} category={props.category} />
				<div className={classes["notepad-action-btns"]}>
					<button onClick={addTaskHandler}>
						<i className={addBtnClass}></i>
					</button>
					<SettingsDropdownMenu />
				</div>
			</div>
			{isAdding && <TaskInputForm notepadId={props.notepadId} />}
			<section>{props.children}</section>
		</div>
	);
};

export default NotepadLayout;
