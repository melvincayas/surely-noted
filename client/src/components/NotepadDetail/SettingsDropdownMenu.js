import { Fragment } from "react";
import { useRef } from "react";
import useEdit from "../../hooks/useEdit";
import useDelete from "../../hooks/useDelete";
import useShare from "../../hooks/useShare";
import EditNotepad from "./EditNotepad";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";

const SettingsDropdownMenu = ({ id, title, category }) => {
	const dropdownRef = useRef();
	const { areSettingsActive, setAreSettingsActive, settingsHandler } =
		useDropdownMenu(dropdownRef);
	const { isEditing, editStatusHandler } = useEdit({
		title,
		category,
	});
	const { deleteClickHandler, isShowingDeleteConfirm, confirmDeleteModal } =
		useDelete(id);
	const { isShowingShareModal, toggleShareModal, shareModal } = useShare(id);

	const toggleEditModal = () => {
		if (areSettingsActive) setAreSettingsActive(prevState => !prevState);
		editStatusHandler();
	};

	const toggleDeleteConfirmModal = event => {
		if (areSettingsActive) setAreSettingsActive(prevState => !prevState);
		deleteClickHandler(event);
	};

	const dropdownIconClass = areSettingsActive
		? classes["dropdown-icon-active"]
		: "";

	const dropdownMenuClass = areSettingsActive ? classes.active : "";

	return (
		<Fragment>
			{isEditing && (
				<EditNotepad
					id={id}
					title={title}
					category={category}
					modalToggler={editStatusHandler}
				/>
			)}
			{isShowingDeleteConfirm && confirmDeleteModal}
			{isShowingShareModal && shareModal}
			<div ref={dropdownRef} className={classes["dropdown-menu-container"]}>
				<button className="notepad-action-btn" onClick={settingsHandler}>
					<i className={`fas fa-cog ${dropdownIconClass}`}></i>
				</button>
				<nav className={`${classes["dropdown-menu"]} ${dropdownMenuClass}`}>
					<ul>
						<li>
							<button onClick={toggleEditModal}>Edit</button>
						</li>
						<li>
							<button onClick={toggleShareModal}>Share</button>
						</li>
						<li>
							<button onClick={toggleDeleteConfirmModal}>Delete</button>
						</li>
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default SettingsDropdownMenu;
