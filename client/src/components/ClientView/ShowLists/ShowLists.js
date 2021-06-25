import Card from "../../UI/Card";
import ListItem from "./ListItem";

const ShowLists = ({ category, lists }) => {
	const header = category || "All";
	let result = <p>Create a list to get started!</p>;

	if (lists.length > 0) {
		result = lists.map(list => (
			<ListItem id={list._id} key={list._id} title={list.title} />
		));
	} else {
		result = <p>Create a new a list!</p>;
	}

	return (
		<Card header={header}>
			<section>{result}</section>
		</Card>
	);
};

export default ShowLists;
