import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import ShowLists from "./ShowLists/ShowLists";
import classes from "./ListSelection.module.css";

const ListSelection = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const pickedCategory = query.get("filter");
	const allLists = useSelector(state => state.lists.lists);
	const allCategories = allLists.map(list => list.category);
	const uniqueCategories = allCategories
		.filter((category, index, arr) => {
			return arr.indexOf(category) === index;
		})
		.sort();

	if (pickedCategory !== null && !uniqueCategories.includes(pickedCategory)) {
		return <p>That category doesn't exist!</p>;
	}

	const filteredLists = allLists.filter(
		list => list.category === pickedCategory
	);

	const listsBeingViewed = pickedCategory ? filteredLists : allLists;

	return (
		<div className="columns">
			<div className={`column is-3 ${classes.border}`}>
				<Sidebar categories={uniqueCategories} />
			</div>
			<div className="column is-9">
				<ShowLists category={pickedCategory} lists={listsBeingViewed} />
			</div>
		</div>
	);
};

export default ListSelection;
