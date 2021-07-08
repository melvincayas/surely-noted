import { Link } from "react-router-dom";
import classes from "../../../styles/Home/NotepadSelection.module.css";

const Category = props => {
	const isQueried = props.queryText === props.category ? classes.active : "";

	return (
		<li className="mb-2">
			<Link
				to={`/home?filter=${props.category}`}
				className={`is-size-5 mb-2 pl-5 ml-5 ${classes["sidebar-links"]} ${isQueried}`}
			>
				{props.category}
			</Link>
		</li>
	);
};

export default Category;
