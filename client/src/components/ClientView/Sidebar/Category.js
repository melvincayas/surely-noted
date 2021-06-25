import { Link } from "react-router-dom";

const Category = props => {
	return (
		<div className="mb-2">
			<Link to={`/home?filter=${props.category}`} className="is-size-5 mb-2">
				{props.category}
			</Link>
		</div>
	);
};

export default Category;
