import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NotepadLayout from "./NotepadLayout";
import TaskCard from "./TaskCard";
import classes from "../../styles/NotepadDetail/NotepadDetail.module.css";

const NotepadDetail = () => {
	const { listId } = useParams();
	const allLists = useSelector(state => state.lists.lists);

	const selectedList = allLists.find(list => list._id === listId);

	if (!selectedList) {
		return <p>That Notepad doesn't exist!</p>;
	}

	const emptyText = (
		<p className={classes["empty-text"]}>Enter items to get started!</p>
	);

	return (
		<Fragment>
			<NotepadLayout
				listId={selectedList._id}
				title={selectedList.title}
				category={selectedList.category}
			>
				{selectedList.items.length === 0 && emptyText}
				{selectedList.items.map(item => (
					<TaskCard
						key={item._id}
						listId={selectedList._id}
						itemId={item._id}
						item={item.content}
					/>
				))}
			</NotepadLayout>
		</Fragment>
	);
};

export default NotepadDetail;
