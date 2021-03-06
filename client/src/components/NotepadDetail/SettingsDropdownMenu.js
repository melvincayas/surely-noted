import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import useEdit from "../../hooks/useEdit";
import useDelete from "../../hooks/useDelete";
import useShare from "../../hooks/useShare";
import EditNotepad from "./EditNotepad";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";
import React from "react";

const SettingsDropdownMenu = ({ id, creator, title, category }) => {
	const dropdownRef = useRef();
	const userData = useSelector(state => state.user.userData);

	const { areSettingsActive, setAreSettingsActive, settingsHandler } =
		useDropdownMenu(dropdownRef);

	const { isEditing, editStatusHandler } = useEdit({
		title,
		category,
	});
	const { deleteClickHandler, isShowingDeleteConfirm, confirmDeleteModal } =
		useDelete(id);

	const { isShowingShareModal, shareClickHandler, shareModal } = useShare(id);

	const toggleEditModal = () => {
		if (areSettingsActive) setAreSettingsActive(prevState => !prevState);
		editStatusHandler();
	};

	const toggleDeleteConfirmModal = event => {
		if (areSettingsActive) setAreSettingsActive(prevState => !prevState);
		deleteClickHandler(event);
	};

	const toggleShareModal = event => {
		if (areSettingsActive) setAreSettingsActive(prevState => !prevState);
		shareClickHandler(event);
	};

	const dropdownIconClass = areSettingsActive
		? classes["dropdown-icon-active"]
		: "";

	const dropdownMenuClass = areSettingsActive ? classes.active : "";

	const userOwnsNotepad = creator._id.toString() === userData._id.toString();

	const buttonsForNotepadOwner = (
		<Fragment>
			<li>
				<button onClick={toggleShareModal}>Share</button>
			</li>
			<li>
				<button onClick={toggleDeleteConfirmModal}>Delete</button>
			</li>
		</Fragment>
	);

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
						{userOwnsNotepad && buttonsForNotepadOwner}
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default SettingsDropdownMenu;
