import {modal} from './modal/modal';

const pages: string[] = ['bookshelf', 'article', 'catalogue', 'config'];

function pageSwitch() {
    

}
window.pageSwitch = pageSwitch;

window.onerror = function(error) {
    alert(error);
}