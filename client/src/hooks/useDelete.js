import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneNotepad } from "../store/notepads/notepad-actions";
import GeneralModal from "../components/UI/GeneralModal";
import Button from "../components/UI/Button";

const useDelete = notepadId => {
	const [isShowingDeleteConfirm, setIsShowingDeleteConfirm] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const confirmedDeleteHandler = () => {
		dispatch(deleteOneNotepad(notepadId));
		history.replace("/home");
	};

	const deleteClickHandler = event => {
		event.stopPropagation();
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

	return { deleteClickHandler, isShowingDeleteConfirm, confirmDeleteModal };
};

export default useDelete;