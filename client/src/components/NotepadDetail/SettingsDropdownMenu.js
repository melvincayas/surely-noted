import { Fragment } from "react";
import { useRef } from "react";
import useEdit from "../../hooks/useEdit";
import useDelete from "../../hooks/useDelete";
import EditNotepad from "./EditNotepad";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";

const SettingsDropdownMenu = ({ id }) => {
	const dropdownRef = useRef();
	const { areSettingsActive, setAreSettingsActive, settingsHandler } =
		useDropdownMenu(dropdownRef);
	const { isEditing, editStatusHandler } = useEdit(id);
	const { deleteClickHandler, isShowingDeleteConfirm, confirmDeleteModal } =
		useDelete(id);

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
			{isEditing && <EditNotepad id={id} modalToggler={editStatusHandler} />}
			{isShowingDeleteConfirm && confirmDeleteModal}
			<div ref={dropdownRef} className={classes["dropdown-menu-container"]}>
				<button onClick={settingsHandler}>
					<i className={`fas fa-cog ${dropdownIconClass}`}></i>
				</button>
				<nav className={`${classes["dropdown-menu"]} ${dropdownMenuClass}`}>
					<ul>
						<li>
							<button onClick={toggleEditModal}>Edit</button>
						</li>
						<li>
							<button>Share</button>
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
