import classes from "../../styles/UI/Button.module.css";

const Button = props => {
	return (
		<button
			className={`${classes["base-btn"]} ${
				props.className ? props.className : ""
			}`}
			disabled={props.isValid}
			onClick={props.clickHandler}
		>
			{props.children}
		</button>
	);
};

export default Button;
