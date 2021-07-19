import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";
import modalClasses from "../../styles/UI/Modal.module.css";
import btnClasses from "../../styles/UI/Button.module.css";

const NotepadName = ({ title, creator, category, shared }) => {
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
			<p className={modalClasses.message}>
				Everyone sharing <strong>{title}</strong>:
			</p>
			<p className={modalClasses.message}>
				{creator.name} ({creator.email}) - <em>Owner</em>
			</p>
			{shared.map(user => (
				<p key={user._id} className={modalClasses.message}>
					{user.name} ({user.email})
				</p>
			))}
			<div className={modalClasses["btn-container"]}>
				<Button
					className={btnClasses.cancel}
					clickHandler={toggleSharedUsersModal}
				>
					Close
				</Button>
			</div>
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
