import {modal} from './modal/modal';

const pages: string[] = ['bookshelf', 'article', 'catalogue', 'config'];

function pageSwitch() {
    document.querySelector('.article .content')!.innerHTML += '1';

}

function jumpTo(target: string) {
    document.querySelector('.show')?.classList.remove('show');
    document.querySelector(`.${target}`)?.classList.add('show');
}

window.pageSwitch = pageSwitch;

window.nextPage = pageSwitch;

window.jumpTo = jumpTo;

window.onerror = function(error) {
}

window.ondblclick = function(event: Event) {
    event.preventDefault();
}