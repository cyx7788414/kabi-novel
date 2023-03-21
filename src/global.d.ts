import Bind from "./common/bind/bind";
import Message from "./common/message/message";
import Modal from "./common/modal/modal";
import Router from "./common/router/router";
import Store from "./common/store/store";
import Config from "./config/config";
import Layout from "./common/layout/layout";

declare global {
    interface Window {
        init?: Function;

        Bind?: Bind;
        Modal?: Modal;
        Message?: Message;
        Router?: Router;
        Store?: Store;
        Layout?: Layout;

        Config?: Config;

    }
}

export { };