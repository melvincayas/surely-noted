import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import ShowNotepads from "./ShowNotepads/ShowNotepads";

const NotepadSelection = () => {
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

	return (
		<div className="columns">
			<Sidebar categories={uniqueCategories} />
			<div className="column is-9">
				{notepadsBeingViewed.map(notepad => (
					<ShowNotepads key={notepad._id} notepad={notepad} />
				))}
			</div>
		</div>
	);
};

export default NotepadSelection;
