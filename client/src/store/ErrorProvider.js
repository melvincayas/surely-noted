import React, { useState } from "react";
import ReactDOM from "react-dom";
import InfoModal from "../components/UI/InfoModal";

export const ErrorContext = React.createContext();

const ErrorProvider = props => {
	const [isError, setIsError] = useState(null);

	const errorHandler = () => {
		setIsError(null);
	};

	return (
		<React.Fragment>
			{isError &&
				ReactDOM.createPortal(
					<InfoModal
						header={"Error"}
						errorHandler={errorHandler}
						message={isError.message}
					/>,
					document.getElementById("modal")
				)}
			<ErrorContext.Provider value={{ setIsError }}>
				{props.children}
			</ErrorContext.Provider>
		</React.Fragment>
	);
};

export default ErrorProvider;
