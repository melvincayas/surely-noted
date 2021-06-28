import { Fragment } from "react";
import { useSelector } from "react-redux";
import NotepadSelection from "./NotepadSelection";
import NotepadDetail from "./NotepadDetail";

const ClientView = () => {
	const allLists = useSelector(state => state.lists.lists);
	const selectedListId = useSelector(state => state.lists.selectedListToView);
	const selectedList = allLists.find(list => list._id === selectedListId);

	return (
		<Fragment>
			{allLists.length > 0 && <NotepadSelection />}
			{allLists.length === 0 && <p>Create a new Notepad!</p>}
			{selectedList && <NotepadDetail selected={selectedList} />}
		</Fragment>
	);
};

export default ClientView;
