import { useHistory } from "react-router-dom";
import ShowTitle from "./ShowTitle";
import ShowStatus from "./ShowStatus";
import classes from "../../../styles/Home/ShowNotepads.module.css";

const ShowNotepads = ({ notepad }) => {
	const history = useHistory();

	const onClickHandler = () => {
		history.push(`/notepad/${notepad._id}`);
	};

	return (
		<div
			className={`columns ${classes["notepad-container"]}`}
			onClick={onClickHandler}
		>
			<ShowTitle title={notepad.title} category={notepad.category} />
			<ShowStatus items={notepad.items} />
		</div>
	);
};

export default ShowNotepads;
