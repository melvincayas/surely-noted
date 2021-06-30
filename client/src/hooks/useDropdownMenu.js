import { useState, useEffect } from "react";

const useDropdownMenu = nodeReference => {
	const [settingsActive, setSettingsActive] = useState(false);

	useEffect(() => {
		const pageClick = event => {
			if (
				nodeReference.current !== null &&
				!nodeReference.current.contains(event.target)
			) {
				setSettingsActive(prevState => !prevState);
			}
		};

		if (settingsActive) {
			document.addEventListener("click", pageClick);
		}

		return () => {
			document.removeEventListener("click", pageClick);
		};
	}, [settingsActive]);

	return {
		settingsActive,
		setSettingsActive,
	};
};

export default useDropdownMenu;
