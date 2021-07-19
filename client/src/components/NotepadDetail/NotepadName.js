import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const NotepadName = ({ title, category, shared }) => {
	const [sharedUsersModalOpen, setSharedUsersModalOpen] = useState(false);
	const isSharedNotepad = shared.length > 0;

	const toggleSharedUsersModal = () => {
		setSharedUsersModalOpen(prevState => !prevState);
	};

	const sharedNotepadButton = (
		<button
			className={classes["shared-notepad-badge"]}
			onClick={toggleSharedUsersModal}
		>
			shared
		</button>
	);

	const sharedUsersModal = ReactDOM.createPortal(
		<Modal clickHandler={toggleSharedUsersModal} header="Shared Users">
			Test
		</Modal>,
		document.getElementById("root")
	);

	return (
		<Fragment>
			{sharedUsersModalOpen && sharedUsersModal}
			<div>
				<div className={classes["title-container"]}>
					<h1 className={classes.title}>{title}</h1>
					{isSharedNotepad && sharedNotepadButton}
				</div>
				<h3 className={classes.subtitle}>{category}</h3>
			</div>
		</Fragment>
	);
};

export default NotepadName;
