import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="has-text-centered pt-5">
			<i className="fas fa-unlink is-size-1"></i>
			<p className="is-size-4 my-5">We can't find what you're looking for!</p>
			<Link className="is-size-4" to="home">
				Go Home
			</Link>
		</div>
	);
};

export default NotFound;
