import useEdit from "../../hooks/useEdit";

import TaskLayout from "./TaskLayout";
import TaskEditLayout from "./TaskEditLayout";
import classes from "../../styles/NotepadDetail/TaskCard.module.css";

const TaskCard = ({ notepadId, itemId, item }) => {
	const {
		isEditing,
		setIsEditing,
		editedContent,
		editStatusHandler,
		editContentHandler,
	} = useEdit(item);

	return (
		<div className={classes.container}>
			{isEditing && (
				<TaskEditLayout
					notepadId={notepadId}
					itemId={itemId}
					setIsEditing={setIsEditing}
					editedContent={editedContent}
					editContentHandler={editContentHandler}
					editStatusHandler={editStatusHandler}
				/>
			)}
			{!isEditing && (
				<TaskLayout
					notepadId={notepadId}
					itemId={itemId}
					item={item}
					editStatusHandler={editStatusHandler}
				/>
			)}
		</div>
	);
};

export default TaskCard;
