import Bind from "./common/bind/bind";
import Message from "./common/message/message";
import Modal from "./common/modal/modal";
import Router from "./common/router/router";
import Store from "./common/store/store";
import Config from "./config/config";
import Layout from "./common/layout/layout";
import Api from './common/api/api';
import BookShelf from "./bookshelf/bookshelf";
import Article from './article/article';
import Catalogue from './catalogue/catalogue';

declare global {
    interface Window {
        init?: Function;

        Bind?: Bind;
        Modal?: Modal;
        Message?: Message;
        Router?: Router;
        Store?: Store;
        Layout?: Layout;
        Api?: Api;

        Config?: Config;
        BookShelf?: BookShelf;
        Article?: Article;
        Catalogue?: Catalogue;
    }
}

export { };