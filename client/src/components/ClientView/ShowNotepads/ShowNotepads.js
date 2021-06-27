import { useHistory } from "react-router-dom";
import ShowTitle from "./ShowTitle";
import ShowStatus from "./ShowStatus";
import classes from "./styles/ShowNotepads.module.css";

const ShowNotepads = ({ list }) => {
	const history = useHistory();

	const onClickHandler = () => {
		history.push(`/list/${list._id}`);
	};

	return (
		<div
			className={`columns ${classes["notepad-container"]}`}
			onClick={onClickHandler}
		>
			<ShowTitle title={list.title} category={list.category} />
			<ShowStatus items={list.items} />
		</div>
	);
};

export default ShowNotepads;
