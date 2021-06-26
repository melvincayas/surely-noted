import { Link } from "react-router-dom";
import classes from "../ListSelection.module.css";

const Category = props => {
	const isQueried = props.queryText === props.category ? classes.active : "";

	return (
		<div className="mb-2">
			<Link
				to={`/home?filter=${props.category}`}
				className={`is-size-5 mb-2 pl-5 ml-5 ${classes.link} ${isQueried}`}
			>
				{props.category}
			</Link>
		</div>
	);
};

export default Category;
