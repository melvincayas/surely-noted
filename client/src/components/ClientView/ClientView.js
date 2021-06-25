import { Fragment } from "react";
import { useSelector } from "react-redux";
import ListSelection from "./ListSelection";
import ListDetail from "./ListDetail/ListDetail";

const UserInterface = () => {
	const allLists = useSelector(state => state.lists.lists);
	const selectedListId = useSelector(state => state.lists.selectedListToView);
	const selectedList = allLists.find(list => list._id === selectedListId);

	return (
		<Fragment>
			<ListSelection />
			{selectedList && <ListDetail selected={selectedList} />}
		</Fragment>
	);
};

export default UserInterface;
