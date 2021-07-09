import { Link, useLocation } from "react-router-dom";
import Category from "./Category";
import classes from "../../../styles/Home/NotepadSelection.module.css";

const Sidebar = ({ categories }) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queryText = query.get("filter");
	const isAll = queryText === null ? classes.active : "";

	console.log(categories);

	return (
		<nav className={`column is-3 ${classes.border}`}>
			<p class="title is-4 pl-5 ml-5">Filter by:</p>

			<ul>
				<li className="mb-2">
					<Link
						to="/home"
						className={`is-size-5 pl-5 ml-5 ${isAll} ${classes["sidebar-links"]}`}
					>
						All
					</Link>
				</li>
				{categories.map((category, index) => (
					<Category key={index} category={category} queryText={queryText} />
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
