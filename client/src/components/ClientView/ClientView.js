import React, { useState } from "react";
import NewList from "./NewList/NewList";
import ShowLists from "./ShowLists/ShowLists";

const UserInterface = props => {
	const [isMakingList, setIsMakingList] = useState(false);

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	return (
		<React.Fragment>
			{isMakingList && <NewList listToggler={newListHandler} />}
			<ShowLists newListHandler={newListHandler} />
		</React.Fragment>
	);
};

export default UserInterface;
