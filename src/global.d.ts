import Modal from "./common/modal/modal";
import Router from "./common/router/router";

declare global {
    interface Window {
        Modal?: Modal;
        Router?: Router;


        pageSwitch?: Function;
        nextPage?: Function;
        jumpTo?: Function;
        init?: Function;
    }
}

export { };