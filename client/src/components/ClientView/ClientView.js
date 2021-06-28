import { Fragment } from "react";
import { useSelector } from "react-redux";
import NotepadSelection from "./NotepadSelection";
import NotepadDetail from "./NotepadDetail";

const ClientView = () => {
	const allLists = useSelector(state => state.lists.lists);

	const initialShow =
		allLists.length > 0 ? <NotepadSelection /> : <p>Create a new notepad!</p>;

	return (
		<Fragment>
			{initialShow}
			<NotepadDetail />
		</Fragment>
	);
};

export default ClientView;
