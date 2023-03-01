import { strToDom } from '../common';


interface ModalOption {
    content: string | HTMLElement;
    onOk?: Function;
    onCancel?: Function;
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
        let modal: Element = strToDom(str)[0];
        let content: HTMLDivElement = modal.querySelector('.modal-content');
        let btnConfirm: HTMLButtonElement = modal.querySelector('.modal-confirm');
        let btnCancel: HTMLButtonElement = modal.querySelector('.modal-cancel');

        if (option.content === 'string') {
            content.innerHTML = option.content;
        } else {
            content.append(option.content);
        }

        btnCancel.onclick = () => {
            this.remove();
        };

        btnConfirm.onclick = () => {
            this.remove();
        };

        window.Modal.element.appendChild(modal);
    }

    remove() {
        this.body.remove();
    }
};


class Modal {
    element: HTMLElement;
    list: ModalItem[];
    constructor() {
        if (window.Modal) {
            throw Error('modal has been inited');
        }
        window.Modal = this;
        this.element = document.querySelector('.modal-box');
    }

    add(content: string | HTMLElement): ModalItem {
        let item = new ModalItem({
            content: content
        });
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