import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import ShowLists from "./ShowLists/ShowLists";
import ListDetail from "./ListDetail/ListDetail";

const UserInterface = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const pickedCategory = query.get("filter");

	const allLists = useSelector(state => state.lists.lists);
	const filteredLists = allLists.filter(
		list => list.category === pickedCategory
	);

	const viewedLists = pickedCategory ? filteredLists : allLists;

	const selectedListId = useSelector(state => state.lists.selectedListToView);
	const selectedList = allLists.find(list => list._id === selectedListId);

	return (
		<Fragment>
			<Sidebar />
			<ShowLists category={pickedCategory} lists={viewedLists} />
			{selectedList && <ListDetail selected={selectedList} />}
		</Fragment>
	);
};

export default UserInterface;
