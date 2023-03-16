import Bind from "./common/bind/bind";
import Modal from "./common/modal/modal";
import Router from "./common/router/router";
import Store from "./common/store/store";

declare global {
    interface Window {
        Bind?: Bind;
        Modal?: Modal;
        Router?: Router;
        Store?: Store;


        pageSwitch?: Function;
        nextPage?: Function;
        jumpTo?: Function;
        init?: Function;
    }
}

export { };