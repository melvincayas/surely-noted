import { Fragment } from "react";
import { useRef } from "react";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";

const SettingsDropdownMenu = ({ id }) => {
	const dropdownRef = useRef();
	const {
		settingsActive,
		settingsHandler,
		deleteClickHandler,
		isShowingDeleteConfirm,
		confirmDeleteModal,
	} = useDropdownMenu(dropdownRef, id);

	const dropdownIconClass = settingsActive
		? classes["dropdown-icon-active"]
		: "";
	const dropdownMenuClass = settingsActive ? classes.active : "";

	return (
		<Fragment>
			{isShowingDeleteConfirm && confirmDeleteModal}
			<div ref={dropdownRef} className={classes["dropdown-menu-container"]}>
				<button onClick={settingsHandler}>
					<i className={`fas fa-cog ${dropdownIconClass}`}></i>
				</button>
				<nav className={`${classes["dropdown-menu"]} ${dropdownMenuClass}`}>
					<ul>
						<li>
							<button>Edit</button>
						</li>
						<li>
							<button>Share</button>
						</li>
						<li>
							<button onClick={deleteClickHandler}>Delete</button>
						</li>
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default SettingsDropdownMenu;
