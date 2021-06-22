import { Fragment } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Error from "../../Error";

const Layout = props => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Fragment>
			{isError && <Error />}
			<div className="App">
				<Navbar />
				<main>{props.children}</main>
			</div>
		</Fragment>
	);
};

export default Layout;
