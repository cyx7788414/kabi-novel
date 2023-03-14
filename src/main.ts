import BookShelf from './bookshelf/bookshelf';
import Config from './config/config';
import Router from './common/router/router';
import Debugger from './common/debugger/debugger';
import Modal from './common/modal/modal';
import Message from './common/message/message';

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

    const modal = new Modal();
    modal.add({content: '123'});

    const router = new Router(pages);
    
    const message = new Message();


    const bookshelf = new BookShelf();
    console.log(bookshelf);
    const config = new Config();
}

window.pageSwitch = pageSwitch;

window.nextPage = pageSwitch;

window.jumpTo = jumpTo;

window.init = init;



window.ondblclick = function(event: Event) {
    event.preventDefault();
}


// // 禁用双指放大
// document.documentElement.addEventListener('touchstart', function (event) {
//     // if (event.touches.length > 1) {
//         event.preventDefault();
//     // }
// }, {
//     passive: false
// });
 
// // 禁用双击放大
// // var lastTouchEnd = 0;
// document.documentElement.addEventListener('touchend', function (event) {
//     // var now = Date.now();
//     // if (now - lastTouchEnd <= 300) {
//         event.preventDefault();
//     // }
//     // lastTouchEnd = now;
// }, {
//     passive: false
// });