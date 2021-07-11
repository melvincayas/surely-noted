import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import ShowNotepads from "./ShowNotepads/ShowNotepads";
import SortDropdown from "./ShowNotepads/SortDropdown";

const NotepadSelection = () => {
	const [selectedSortValue, setSelectedSortValue] = useState("recent");

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const pickedCategory = query.get("filter");
	const allNotepads = useSelector(state => state.notepads.notepads);
	const allCategories = allNotepads.map(notepad => notepad.category);
	const uniqueCategories = allCategories
		.filter((category, index, arr) => {
			return arr.indexOf(category) === index;
		})
		.sort();

	if (pickedCategory !== null && !uniqueCategories.includes(pickedCategory)) {
		return <p>That category doesn't exist!</p>;
	}

	const filteredNotepads = allNotepads.filter(
		notepad => notepad.category === pickedCategory
	);

	const notepadsBeingViewed = pickedCategory ? filteredNotepads : allNotepads;
	const sortedNotepadsBeingViewed = [...notepadsBeingViewed];

	switch (selectedSortValue) {
		case "ascending":
			sortedNotepadsBeingViewed.sort((a, b) => {
				if (a.title < b.title) return -1;
				if (a.title > b.title) return 1;
				return 0;
			});
			break;
		case "descending":
			sortedNotepadsBeingViewed.sort((a, b) => {
				if (a.title > b.title) return -1;
				if (a.title < b.title) return 1;
				return 0;
			});
			break;
		case "newest":
			sortedNotepadsBeingViewed.sort((a, b) => {
				if (a.created > b.created) return -1;
				if (a.created < b.created) return 1;
				return 0;
			});
			break;
		default:
			sortedNotepadsBeingViewed.sort((a, b) => {
				if (a.modified > b.modified) return -1;
				if (a.modified < b.modified) return 1;
				return 0;
			});
			break;
	}

	const selectedSortHandler = event => setSelectedSortValue(event.target.value);

	return (
		<div className="columns">
			<Sidebar categories={uniqueCategories} />
			<div className="column is-9">
				<SortDropdown
					sortValue={selectedSortValue}
					onChangeHandler={selectedSortHandler}
				/>
				{sortedNotepadsBeingViewed.map(notepad => (
					<ShowNotepads key={notepad._id} notepad={notepad} />
				))}
			</div>
		</div>
	);
};

export default NotepadSelection;
