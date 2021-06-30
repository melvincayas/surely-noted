import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneNotepad } from "../store/notepads/notepad-actions";

const useDropdownMenu = (nodeReference, notepadId) => {
	const [settingsActive, setSettingsActive] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const pageClick = event => {
			if (
				nodeReference.current !== null &&
				!nodeReference.current.contains(event.target)
			) {
				setSettingsActive(prevState => !prevState);
			}
		};

		if (settingsActive) {
			document.addEventListener("click", pageClick);
		}

		return () => {
			document.removeEventListener("click", pageClick);
		};
	}, [settingsActive]);

	const settingsHandler = () => setSettingsActive(prevState => !prevState);

	const deleteHandler = () => {
		dispatch(deleteOneNotepad(notepadId));
		history.replace("/home");
	};

	return {
		settingsActive,
		settingsHandler,
		deleteHandler,
	};
};

export default useDropdownMenu;
