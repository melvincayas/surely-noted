import { useReducer } from "react";

const initializeState = initialInputState => {
	return {
		input: initialInputState ? initialInputState : "",
		inputTouched: false,
	};
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
			return initializeState(action.payload);
	}
};

const useInputValidation = (validateInput, initialInputState = null) => {
	const [state, dispatchState] = useReducer(
		inputReducer,
		initialInputState,
		initializeState
	);

	const inputValid = validateInput(state.input);

	const inputChangeHandler = event => {
		dispatchState({ type: "INPUT", input: event.target.value });
	};

	const inputBlurHandler = () => {
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
