import React, { useState, useContext } from "react";
import NewList from "./NewList/NewList";
import ShowLists from "./ShowLists/ShowLists";
import ListDetail from "./ListDetail/ListDetail";
import { ListContext } from "../../store/ListProvider";

const UserInterface = props => {
	const [isMakingList, setIsMakingList] = useState(false);

	const { filteredList } = useContext(ListContext);

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	return (
		<React.Fragment>
			{isMakingList && <NewList listToggler={newListHandler} />}
			<ShowLists newListHandler={newListHandler} />
			{filteredList && <ListDetail selected={filteredList} />}
		</React.Fragment>
	);
};

export default UserInterface;
