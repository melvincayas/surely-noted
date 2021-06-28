import { Fragment } from "react";
import { useSelector } from "react-redux";
import NotepadSelection from "./NotepadSelection";

const Home = () => {
	const allLists = useSelector(state => state.lists.lists);

	const initialShow =
		allLists.length > 0 ? <NotepadSelection /> : <p>Create a new notepad!</p>;

	return <Fragment>{initialShow}</Fragment>;
};

export default Home;
