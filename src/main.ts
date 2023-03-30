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
import Article from './article/article';
import Catalogue from './catalogue/catalogue';

const pages: string[] = ['config', 'bookshelf', 'article', 'catalogue'];

function init() {
    new Debugger();

    new Bind();

    new Modal();
    new Message();

    new Router(pages);

    new Store();

    new Layout();

    new Api();

    document.querySelector('.global-style').innerHTML = `
        <style>
            .page .content {
                height: ${document.body.offsetHeight - 230}px;
            }
        </style>
    `;

    window.Config = new Config();

    window.BookShelf = new BookShelf();

    window.Article = new Article();
    
    window.Catalogue = new Catalogue();
}

window.init = init;



window.ondblclick = function(event: Event) {
    event.preventDefault();
}