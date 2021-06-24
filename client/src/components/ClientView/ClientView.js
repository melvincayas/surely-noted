import { Fragment } from "react";
import { useSelector } from "react-redux";
import ShowLists from "./ShowLists/ShowLists";
import ListDetail from "./ListDetail/ListDetail";

const UserInterface = () => {
	const allLists = useSelector(state => state.lists.lists);
	const selectedListId = useSelector(state => state.lists.selectedListToView);

	const categories = allLists.map(list => list.category);
	const uniqueCategories = categories.filter((category, index, arr) => {
		return arr.indexOf(category) === index;
	});

	const selectedList = allLists.find(list => list._id === selectedListId);

	return (
		<Fragment>
			{uniqueCategories.map(category => (
				<ShowLists category={category} />
			))}
			{selectedList && <ListDetail selected={selectedList} />}
		</Fragment>
	);
};

export default UserInterface;
