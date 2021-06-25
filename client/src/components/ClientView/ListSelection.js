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
	const filteredLists = allLists.filter(
		list => list.category === pickedCategory
	);

	const viewedLists = pickedCategory ? filteredLists : allLists;

	return (
		<div className="columns">
			<div className={`column is-2 ${classes.border}`}>
				<Sidebar />
			</div>
			<div className="column is-10">
				<ShowLists category={pickedCategory} lists={viewedLists} />
			</div>
		</div>
	);
};

export default ListSelection;
