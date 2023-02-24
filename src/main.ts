import BookShelf from './bookshelf/bookshelf';

const pages: string[] = ['bookshelf', 'article', 'catalogue', 'config'];

function pageSwitch() {
    document.querySelector('.article .content')!.innerHTML += '1';

}

function jumpTo(target: string) {
    document.querySelector('.show')?.classList.remove('show');
    document.querySelector(`.${target}`)?.classList.add('show');
}



function init() {
    const bookshelf = new BookShelf();
    console.log(bookshelf);
}

window.pageSwitch = pageSwitch;

window.nextPage = pageSwitch;

window.jumpTo = jumpTo;

window.init = init;

window.onerror = function(error) {
}

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