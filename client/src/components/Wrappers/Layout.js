import { Fragment } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Error from "../../Error";

const Layout = props => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Fragment>
			{isError && <Error />}
			<Navbar />
			<div className="App container">{props.children}</div>
		</Fragment>
	);
};

export default Layout;
