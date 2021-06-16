import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";
import App from "./App";
import UserProvider from "./store/UserProvider";

ReactDOM.render(
	<Provider store={store}>
		<UserProvider>
			<App />
		</UserProvider>
	</Provider>,
	document.getElementById("root")
);
