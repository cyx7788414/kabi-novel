import { strToDom } from '../common';


interface ModalOption {
    content: string | HTMLElement;

};

class ModalItem {
    body: HTMLElement;

    constructor(option: ModalOption) {
        let str = `
            <div class="modal">
                <div class="modal-content">
                </div>
                <div class="modal-footer">
                    <button class="modal-confirm">确定</button>
                    <button class="modal-cancel">取消</button>
                </div>
            </div>
        `;
        let modal = strToDom(str);
        let div = document.createElement('div');
        div.classList.add('modal');
        // div.innerHTML = typeof option.content === 'string'?option;
        window.modal.element.appendChild(div);
    }

    remove() {
        this.body.remove();
    }
};


class Modal {
    element: HTMLElement;
    list: ModalItem[];
    constructor() {
        if (window.modal) {
            throw Error('modal has been inited');
        }
        window.modal = this;
        this.element = document.querySelector('.modal-box');
    }

    add(content: string): ModalItem {
        let item = new ModalItem(content);
        this.list.push(item);
        return item;
    }

    remove(item: ModalItem): void {
        item.remove();
        let index = this.list.indexOf(item);
        this.list.splice(index, 1);
    }

    clear(): void {
        this.list = [];
    }
}

export default Modal;