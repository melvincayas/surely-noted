import { useHistory } from "react-router-dom";
import ShowTitle from "./ShowTitle";
import ShowContent from "./ShowContent";
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
			<div className="column is-half">
				<ShowTitle title={list.title} category={list.category} />
			</div>
			<div className="column is-half">
				<ShowContent created={list.created} items={list.items} />
			</div>
		</div>
	);
};

export default ShowNotepads;
