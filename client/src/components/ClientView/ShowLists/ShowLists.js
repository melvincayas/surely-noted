import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import ListItem from "./ListItem";

const ShowLists = props => {
	const title = props.category || "No category";
	const allLists = useSelector(state => state.lists.lists);
	const groupedList = allLists.filter(list => list.category === props.category);

	let result = <p>Create a list to get started!</p>;

	if (groupedList.length > 0) {
		result = groupedList.map(list => (
			<ListItem id={list._id} key={list._id} title={list.title} />
		));
	} else {
		result = <p>Create a new a list!</p>;
	}

	return (
		<Card header={title}>
			<section>{result}</section>
		</Card>
	);
};

export default ShowLists;
