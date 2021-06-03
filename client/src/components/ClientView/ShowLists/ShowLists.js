import React, { useContext } from "react";
import { ListContext } from "../../../store/ListProvider";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import ListItem from "./ListItem";

const ShowLists = props => {
	const { lists } = useContext(ListContext);

	return (
		<Card header="Lists">
			<Button clickHandler={props.newListHandler}>Create List</Button>
			<section>
				{lists &&
					lists.map(list => <ListItem key={list._id} title={list.title} />)}
			</section>
		</Card>
	);
};

export default ShowLists;
