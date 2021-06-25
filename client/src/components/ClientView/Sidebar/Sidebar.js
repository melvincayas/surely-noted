import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Category from "./Category";

const Sidebar = () => {
	const allLists = useSelector(state => state.lists.lists);
	const categories = allLists.map(list => list.category);
	const uniqueCategories = categories
		.filter((category, index, arr) => {
			return arr.indexOf(category) === index;
		})
		.sort();

	return (
		<Fragment>
			<div className="mb-2">
				<Link to="/home" className="is-size-5">
					All
				</Link>
			</div>
			{uniqueCategories.map(category => (
				<Category category={category} />
			))}
		</Fragment>
	);
};

export default Sidebar;
