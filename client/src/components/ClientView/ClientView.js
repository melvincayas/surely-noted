import React, { useState } from "react";
import Form from "./UserInput/Form";
import List from "./List/List";
import NewList from "./NewList/NewList";

const UserInterface = props => {
	const [isMakingList, setIsMakingList] = useState(false);

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	return (
		<React.Fragment>
			<a href="#" onClick={newListHandler}>
				New List
			</a>
			{isMakingList && <NewList listToggler={newListHandler} />}
			<Form liftState={props.formHandler} />
			<List todos={props.todos} liftRemove={props.removeHandler} />
		</React.Fragment>
	);
};

export default UserInterface;
