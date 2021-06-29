import { useState, useRef } from "react";
import classes from "../../styles/NotepadDetail/NotepadLayout.module.css";

const SettingsDropdownMenu = () => {
	const [settingsActive, setSettingsActive] = useState(false);
	const dropdownRef = useRef();

	const settingsHandler = () => setSettingsActive(prevState => !prevState);

	const settingsBtnClass = settingsActive ? classes.active : "";

	return (
		<div className={classes["dropdown-menu-container"]}>
			<button onClick={settingsHandler}>
				<i className="fas fa-cog"></i>
			</button>
			<nav
				ref={dropdownRef}
				className={`${classes["dropdown-menu"]} ${settingsBtnClass}`}
			>
				<ul>
					<li>Edit</li>
					<li>Delete</li>
				</ul>
			</nav>
		</div>
	);
};

export default SettingsDropdownMenu;
