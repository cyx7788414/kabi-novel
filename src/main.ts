import BookShelf from './bookshelf/bookshelf';
import Config from './config/config';
import Router from './common/router/router';
import Debugger from './common/debugger/debugger';
import Modal from './common/modal/modal';
import Message from './common/message/message';
import Store from './common/store/store';
import Bind from './common/bind/bind';
import Layout from './common/layout/layout';
import Api from './common/api/api';

const pages: string[] = ['bookshelf', 'article', 'catalogue', 'config'];

function init() {
    new Debugger();

    new Bind();

    new Modal();
    new Message();

    new Router(pages);

    new Store();

    new Layout();

    new Api();
    
    window.Config = new Config();

    


    const bookshelf = new BookShelf();
    console.log(bookshelf);
}

window.init = init;



window.ondblclick = function(event: Event) {
    event.preventDefault();
}