import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneList } from "../../../store/lists/list-actions";

import LoadingSpinner from "../../UI/LoadingSpinner";
import Card from "../../UI/Card";
import ItemCard from "./ItemCard";
import classes from "./styles/List.module.css";
import ItemInputForm from "./ItemInputForm";

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
		<Card header={selectedList.title}>
			<ItemInputForm listId={selectedList._id} />
			{selectedList.items.length === 0 && emptyText}
			{selectedList.items.map(item => (
				<ItemCard
					key={item._id}
					listId={selectedList._id}
					itemId={item._id}
					item={item.content}
				/>
			))}
		</Card>
	);
};

export default List;
