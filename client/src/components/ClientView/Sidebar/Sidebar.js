import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Category from "./Category";

const Sidebar = () => {
	const allLists = useSelector(state => state.lists.lists);
	const categories = allLists.map(list => list.category);
	const uniqueCategories = categories.filter((category, index, arr) => {
		return arr.indexOf(category) === index;
	});

	return (
		<div>
			<Link to="/home">All</Link>
			{uniqueCategories.map(category => (
				<Category category={category} />
			))}
		</div>
	);
};

export default Sidebar;
