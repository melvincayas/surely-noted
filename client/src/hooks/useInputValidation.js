import { useReducer } from "react";

const defaultInput = {
	input: "",
	inputTouched: false,
};

const inputReducer = (state, action) => {
	switch (action.type) {
		case "INPUT":
			return {
				input: action.input,
				inputTouched: false,
			};
		case "BLUR":
			return {
				...state,
				inputTouched: true,
			};
		default:
			return defaultInput;
	}
};

const useInputValidation = validateInput => {
	const [state, dispatchState] = useReducer(inputReducer, defaultInput);

	const inputValid = validateInput(state.input);

	const inputChangeHandler = event => {
		dispatchState({ type: "INPUT", input: event.target.value });
	};

	const inputBlurHandler = event => {
		dispatchState({ type: "BLUR" });
	};

	const inputError = !inputValid && state.inputTouched;

	return {
		inputChangeHandler,
		inputBlurHandler,
		inputError,
		inputValid,
		value: state.input,
	};
};

export default useInputValidation;
