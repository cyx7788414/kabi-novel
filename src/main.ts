import BookShelf from './bookshelf/bookshelf';
import Config from './config/config';
import Router from './common/router/router';
import Debugger from './common/debugger/debugger';
import Modal from './common/modal/modal';
import Message from './common/message/message';
import Store from './common/store/store';
import Bind from './common/bind/bind';

const pages: string[] = ['bookshelf', 'article', 'catalogue', 'config'];

function pageSwitch() {
    document.querySelector('.article .content')!.innerHTML += '1';

}

function jumpTo(target: string) {
    // document.querySelector('.show')?.classList.remove('show');
    // document.querySelector(`.${target}`)?.classList.add('show');

    window.location.hash = target;
}



function init() {
    const debug = new Debugger();

    const bind = new Bind();

    const modal = new Modal();

    const router = new Router(pages);

    const store = new Store();
    
    const config = new Config();

    
    const message = new Message();


    const bookshelf = new BookShelf();
    console.log(bookshelf);
}

window.pageSwitch = pageSwitch;

window.nextPage = pageSwitch;

window.jumpTo = jumpTo;

window.init = init;



window.ondblclick = function(event: Event) {
    event.preventDefault();
}