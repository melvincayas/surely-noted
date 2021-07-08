import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneNotepad } from "../store/notepads/notepad-actions";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";
import modalClasses from "../styles/UI/Modal.module.css";
import btnClasses from "../styles/UI/Button.module.css";

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
		<Modal clickHandler={deleteClickHandler} header="Confirm Deletion">
			<p className={modalClasses.message}>
				You'll lose everything in this notepad. Are you sure?
			</p>
			<div className={modalClasses["btn-container"]}>
				<Button clickHandler={confirmedDeleteHandler}>Delete</Button>
				<Button className={btnClasses.cancel} clickHandler={deleteClickHandler}>
					Cancel
				</Button>
			</div>
		</Modal>,
		document.getElementById("modal")
	);

	return { deleteClickHandler, isShowingDeleteConfirm, confirmDeleteModal };
};

export default useDelete;
