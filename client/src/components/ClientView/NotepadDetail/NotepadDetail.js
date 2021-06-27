import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneList } from "../../../store/lists/list-actions";

import LoadingSpinner from "../../UI/LoadingSpinner";
import NotepadLayout from "./NotepadLayout";
import ItemCard from "./ItemCard";
import classes from "./styles/List.module.css";

let initialLoad = true;

const List = () => {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const selectedList = useSelector(state => state.lists.selectedList);
	const listsLoading = useSelector(state => state.lists.listsLoading);

	useEffect(() => {
		dispatch(getOneList(listId));
	}, [dispatch, listId]);

	const emptyText = (
		<p className={classes["empty-text"]}>Enter items to get started!</p>
	);

	if (initialLoad || listsLoading) {
		initialLoad = false;
		return <LoadingSpinner />;
	}

	return (
		<Fragment>
			<NotepadLayout
				listId={selectedList._id}
				title={selectedList.title}
				category={selectedList.category}
			>
				{selectedList.items.length === 0 && emptyText}
				{selectedList.items.map(item => (
					<ItemCard
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

export default List;
