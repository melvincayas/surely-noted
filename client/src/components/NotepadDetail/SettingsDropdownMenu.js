import { useRef } from "react";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import classes from "../../styles/NotepadDetail/SettingsDropdownMenu.module.css";

const SettingsDropdownMenu = () => {
	const dropdownRef = useRef();
	const { settingsActive, setSettingsActive } = useDropdownMenu(dropdownRef);

	const settingsHandler = () => setSettingsActive(prevState => !prevState);

	const dropdownIconClass = settingsActive
		? classes["dropdown-icon-active"]
		: "";
	const dropdownMenuClass = settingsActive ? classes.active : "";

	return (
		<div ref={dropdownRef} className={classes["dropdown-menu-container"]}>
			<button onClick={settingsHandler}>
				<i className={`fas fa-cog ${dropdownIconClass}`}></i>
			</button>
			<nav className={`${classes["dropdown-menu"]} ${dropdownMenuClass}`}>
				<ul>
					<li>Edit</li>
					<li>Delete</li>
				</ul>
			</nav>
		</div>
	);
};

export default SettingsDropdownMenu;
