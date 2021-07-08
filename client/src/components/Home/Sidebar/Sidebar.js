import { Link, useLocation } from "react-router-dom";
import Category from "./Category";
import classes from "../../../styles/Home/NotepadSelection.module.css";

const Sidebar = ({ categories }) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queryText = query.get("filter");
	const isAll = queryText === null ? classes.active : "";

	return (
		<ul>
			<li className="mb-2 pl-5 ml-5">
				<Link to="/home" className={`is-size-5 ${isAll}`}>
					All
				</Link>
			</li>
			{categories.map((category, index) => (
				<Category key={index} category={category} queryText={queryText} />
			))}
		</ul>
	);
};

export default Sidebar;
