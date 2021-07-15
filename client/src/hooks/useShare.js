import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";
import modalClasses from "../styles/UI/Modal.module.css";
import btnClasses from "../styles/UI/Button.module.css";

// useState for opening share modal onClick of Share in dropdown
// make modal where user will enter e-mail to find
// make buttons for Share and Cancel
// make dispatch action on Share button on modal

const useShare = notepadId => {
	const [isShowingShareModal, setIsShareModalOpen] = useState(false);
	const dispatch = useDispatch();

	const toggleShareModal = event => {
		event.stopPropagation();
		setIsShareModalOpen(prevState => !prevState);
	};

	const shareModal = ReactDOM.createPortal(
		<Modal clickHandler={toggleShareModal} header="Share Notepad">
			<p className={modalClasses.message}>
				Enter e-mail(s) of people to share your notepad with!
			</p>
			<div className={modalClasses["btn-container"]}>
				<Button clickHandler={toggleShareModal}>Share</Button>
				<Button className={btnClasses.cancel} clickHandler={toggleShareModal}>
					Cancel
				</Button>
			</div>
		</Modal>,
		document.getElementById("modal")
	);

	return {
		isShowingShareModal,
		toggleShareModal,
		shareModal,
	};
};

export default useShare;
