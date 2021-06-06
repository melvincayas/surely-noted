import { useContext } from "react";
import classes from "./ListItem.module.css";
import Button from "../../UI/Button";
import { ListContext } from "../../../store/ListProvider";

const ListItem = props => {
	const listCtx = useContext(ListContext);

	const trashHandler = async () => {
		const request = {
			id: props.id,
		};
		const result = await fetch("/list/delete", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const { response } = await result.json();

		if (response.type === "success") {
			listCtx.removeListHandler(props.id);
		}
	};

	return (
		<div className={classes.container}>
			<span>{props.title}</span>
			<Button className={classes.trash} clickHandler={trashHandler}>
				<i className="fas fa-trash-alt"></i>
			</Button>
		</div>
	);
};

export default ListItem;
