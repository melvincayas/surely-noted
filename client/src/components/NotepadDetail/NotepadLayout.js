import { useState } from "react";
import TaskInputForm from "./TaskInputForm";
import NotepadName from "./NotepadName";
import NotepadControls from "./NotepadControls";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadLayout = props => {
	const [isAdding, setIsAdding] = useState(false);

	const addTaskHandler = () => setIsAdding(prevState => !prevState);

	const addTaskBtnClass = isAdding
		? "fas fa-minus-square"
		: "fas fa-plus-square";

	return (
		<div className={`${classes.notepad} ${props.className}`}>
			<div className={classes.header}>
				<NotepadName title={props.title} category={props.category} />
				<NotepadControls
					id={props.id}
					creator={props.creator}
					title={props.title}
					category={props.category}
					addTaskHandler={addTaskHandler}
					addTaskBtnClass={addTaskBtnClass}
				/>
			</div>
			{isAdding && <TaskInputForm id={props.id} />}
			<section>{props.children}</section>
		</div>
	);
};

export default NotepadLayout;
