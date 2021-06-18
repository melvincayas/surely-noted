import Card from "../../UI/Card";
import ItemCard from "./ItemCard";
import classes from "./styles/List.module.css";
import ItemInputForm from "./ItemInputForm";

const List = ({ selected }) => {
	const emptyText = (
		<p className={classes["empty-text"]}>Enter items to get started!</p>
	);

	return (
		<Card header={selected.title}>
			<ItemInputForm listId={selected._id} />
			{selected.items.length === 0 && emptyText}
			{selected.items.map(item => (
				<ItemCard
					key={item._id}
					listId={selected._id}
					itemId={item._id}
					item={item.content}
				/>
			))}
		</Card>
	);
};

export default List;
