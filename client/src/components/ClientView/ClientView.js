import React, { useState, useContext } from "react";
import NewList from "./NewList/NewList";
import ShowLists from "./ShowLists/ShowLists";
import ListDetail from "./ListDetail/ListDetail";
import { ListContext } from "../../store/ListProvider";

const UserInterface = props => {
	const [isMakingList, setIsMakingList] = useState(false);

	const { lists, selectedList } = useContext(ListContext);
	let filteredList;

	if (selectedList) {
		[filteredList] = lists.filter(list => list._id === selectedList);
	}

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	return (
		<React.Fragment>
			{isMakingList && <NewList listToggler={newListHandler} />}
			<ShowLists newListHandler={newListHandler} />
			{selectedList && <ListDetail selected={filteredList} />}
		</React.Fragment>
	);
};

export default UserInterface;
