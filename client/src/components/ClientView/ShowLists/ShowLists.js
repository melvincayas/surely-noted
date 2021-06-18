import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import ListItem from "./ListItem";

const ShowLists = props => {
	const lists = useSelector(state => state.lists.lists);
	let result = <p>Create a list to get started!</p>;

	if (lists.length > 0) {
		result = lists.map(list => (
			<ListItem id={list._id} key={list._id} title={list.title} />
		));
	} else {
		result = <p>Create a new a list!</p>;
	}

	return (
		<Card header="Lists">
			<Button clickHandler={props.newListHandler}>Create List</Button>
			<section>{result}</section>
		</Card>
	);
};

export default ShowLists;
