import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GeneralModal from "../components/UI/GeneralModal";
import Button from "../components/UI/Button";
import { deleteOneNotepad } from "../store/notepads/notepad-actions";

const useDropdownMenu = (nodeReference, notepadId) => {
	const [settingsActive, setSettingsActive] = useState(false);
	const [isShowingDeleteConfirm, setIsShowingDeleteConfirm] = useState(false);
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

	const confirmedDeleteHandler = () => {
		dispatch(deleteOneNotepad(notepadId));
		history.replace("/home");
	};

	const deleteClickHandler = event => {
		event.stopPropagation();
		if (settingsActive) setSettingsActive(prevState => !prevState);
		setIsShowingDeleteConfirm(prevState => !prevState);
	};

	const confirmDeleteModal = ReactDOM.createPortal(
		<GeneralModal clickHandler={deleteClickHandler} header="Confirm Deletion">
			<p>You'll lose everything in this notepad. Are you sure?</p>
			<div>
				<Button clickHandler={confirmedDeleteHandler}>Delete</Button>
				<Button clickHandler={deleteClickHandler}>Cancel</Button>
			</div>
		</GeneralModal>,
		document.getElementById("modal")
	);

	return {
		settingsActive,
		settingsHandler,
		deleteClickHandler,
		isShowingDeleteConfirm,
		confirmDeleteModal,
	};
};

export default useDropdownMenu;
