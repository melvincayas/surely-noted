import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import NewList from "./NewList/NewList";
import ShowLists from "./ShowLists/ShowLists";
import ListDetail from "./ListDetail/ListDetail";

const UserInterface = () => {
	const [isMakingList, setIsMakingList] = useState(false);
	const allLists = useSelector(state => state.lists.lists);
	const selectedListId = useSelector(state => state.lists.selectedListToView);

	const categories = allLists.map(list => list.category);
	const uniqueCategories = categories.filter((category, index, arr) => {
		return arr.indexOf(category) === index;
	});
	console.log(uniqueCategories);

	const selectedList = allLists.find(list => list._id === selectedListId);

	const newListHandler = event => {
		event.preventDefault();
		setIsMakingList(prevIsMakingList => !prevIsMakingList);
	};

	return (
		<Fragment>
			{isMakingList && <NewList listToggler={newListHandler} />}
			{uniqueCategories.map(category => (
				<ShowLists category={category} newListHandler={newListHandler} />
			))}
			{selectedList && <ListDetail selected={selectedList} />}
		</Fragment>
	);
};

export default UserInterface;
