import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NotepadLayout from "./NotepadLayout";
import TaskCard from "./TaskCard";
import classes from "../../styles/NotepadDetail/NotepadDetail.module.css";

const NotepadDetail = () => {
	const { listId } = useParams();
	const allNotepads = useSelector(state => state.lists.lists);

	const selectedNotepad = allNotepads.find(notepad => notepad._id === listId);

	if (!selectedNotepad) {
		return <p>That Notepad doesn't exist!</p>;
	}

	const emptyText = (
		<p className={classes["empty-text"]}>Enter items to get started!</p>
	);

	return (
		<Fragment>
			<NotepadLayout
				listId={selectedNotepad._id}
				title={selectedNotepad.title}
				category={selectedNotepad.category}
			>
				{selectedNotepad.items.length === 0 && emptyText}
				{selectedNotepad.items.map(item => (
					<TaskCard
						key={item._id}
						listId={selectedNotepad._id}
						itemId={item._id}
						item={item.content}
					/>
				))}
			</NotepadLayout>
		</Fragment>
	);
};

export default NotepadDetail;
