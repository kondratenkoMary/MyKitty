import React from "react";
import ReactDOM from "react-dom";
import App from "./Router";
import "./styles/index.less";
import configureStore from "./store";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

export const history = createBrowserHistory();
const store = configureStore({}, history);

const renderApp = () =>
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.querySelector("#root")
    );

renderApp();

if (module.hot) {
    module.hot.accept("./Router", () => {
        renderApp();
    });
}
