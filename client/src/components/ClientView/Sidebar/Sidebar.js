import { Fragment } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import classes from "../ListSelection.module.css";

const Sidebar = ({ categories }) => {
	return (
		<Fragment>
			<div className="mb-2 pl-5 ml-5">
				<Link to="/home" className={`is-size-5 ${classes.link}`}>
					All
				</Link>
			</div>
			{categories.map((category, index) => (
				<Category key={index} category={category} />
			))}
		</Fragment>
	);
};

export default Sidebar;
