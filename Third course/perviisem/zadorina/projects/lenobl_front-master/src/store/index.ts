import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";

declare global {
    interface Window {
        devToolsExtension: any;
    }
}

export default function configureStore(initialState: any, history: History) {
    const middleware = [routerMiddleware(history), thunkMiddleware];

    const logger = require("redux-logger");
    middleware.push(
        logger.createLogger({
            level: "info",
            collapsed: true
        })
    );

    const enhancer = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension
            ? window.devToolsExtension({ name: "форма заявки", instanceId: "ppmi-request-form-id" })
            : (f: any) => f
    );

    const store = createStore(rootReducer(history), initialState, enhancer);

    if (process.env.NODE_ENV !== "production" && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
