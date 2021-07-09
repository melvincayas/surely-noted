import { Link, useLocation } from "react-router-dom";
import Category from "./Category";
import classes from "../../../styles/Home/NotepadSelection.module.css";

const Sidebar = ({ categories }) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queryText = query.get("filter");
	const isAll = queryText === null ? classes.active : "";

	return (
		<nav className="column is-3">
			<div className={classes["filter-box"]}>
				<p className={classes.header}>Categories</p>
				<ul>
					{queryText && (
						<li className="mb-2">
							<Link
								to="/home"
								className={`${isAll} ${classes["sidebar-links"]}`}
							>
								Show All
							</Link>
						</li>
					)}
					{categories.map((category, index) => (
						<Category key={index} category={category} queryText={queryText} />
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;
