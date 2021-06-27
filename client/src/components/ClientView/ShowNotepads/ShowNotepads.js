import ShowTitle from "./ShowTitle";
import ShowContent from "./ShowContent";
import classes from "./styles/ShowNotepads.module.css";

const ShowNotepads = ({ list }) => {
	console.log(list);
	return (
		<div className={`columns ${classes["notepad-container"]}`}>
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
