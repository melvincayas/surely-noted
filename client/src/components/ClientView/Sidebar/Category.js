import { Link } from "react-router-dom";

const Category = props => {
	return (
		<div>
			<Link to={`/home?filter=${props.category}`}>{props.category}</Link>
		</div>
	);
};

export default Category;
