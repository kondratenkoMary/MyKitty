import { error as errorAction, success as successAction } from "react-notification-system-redux";

const position: "tr" | "tl" | "tc" | "br" | "bl" | "bc" = "bc";

class Notify {
    public success = (message: string) =>
        successAction({
            message,
            position
        });

    public error = (message: string) =>
        errorAction({
            message,
            position
        });
}

const notify = new Notify();

export default notify;
