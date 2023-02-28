import Modal from "./common/modal/modal";

declare global {
    interface Window {
        modal?: Modal
        pageSwitch?: Function;
        nextPage?: Function;
        jumpTo?: Function;
        init?: Function;
    }
}

export { };