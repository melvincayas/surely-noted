import { useState, useEffect } from "react";

const useDropdownMenu = nodeReference => {
	const [areSettingsActive, setAreSettingsActive] = useState(false);

	useEffect(() => {
		const pageClick = event => {
			if (
				nodeReference.current !== null &&
				!nodeReference.current.contains(event.target)
			) {
				setAreSettingsActive(prevState => !prevState);
			}
		};

		if (areSettingsActive) {
			document.addEventListener("click", pageClick);
		}

		return () => {
			document.removeEventListener("click", pageClick);
		};
	}, [areSettingsActive, nodeReference]);

	const settingsHandler = () => setAreSettingsActive(prevState => !prevState);

	return {
		areSettingsActive,
		setAreSettingsActive,
		settingsHandler,
	};
};

export default useDropdownMenu;
