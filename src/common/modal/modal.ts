import { strToDom } from '../common';


interface ModalOption {
    content: string | HTMLElement;
    onOk?: Function;
    onCancel?: Function;
    zIndex?: number;
};

class ModalItem {
    body: Element;
    zIndex: number;
    constructor(option: ModalOption) {
        this.zIndex = option.zIndex;
        let str = `
            <div class="modal" style="z-index: ${this.zIndex};">
                <div class="modal-content">
                </div>
                <div class="modal-footer">
                    <div class="button modal-confirm">确定</div>
                    <div class="button modal-cancel">取消</div>
                </div>
            </div>
        `;
        let modal: Element = strToDom(str)[0];
        this.body = modal;
        let content: HTMLDivElement = modal.querySelector('.modal-content');
        let btnConfirm: HTMLButtonElement = modal.querySelector('.modal-confirm');
        let btnCancel: HTMLButtonElement = modal.querySelector('.modal-cancel');
        if (typeof option.content === 'string') {
            content.innerHTML = option.content;
        } else {
            content.appendChild(option.content);
        }
        btnCancel.onclick = () => {
            option.onCancel && option.onCancel();
            this.remove();
        };

        btnConfirm.onclick = () => {
            option.onOk && option.onOk();
            this.remove();
        };
    }

    remove() {
        let parent = this.body.parentElement;
        parent.removeChild(this.body);
    }
};


class Modal {
    element: HTMLElement;
    list: ModalItem[] = [];
    constructor() {
        if (window.Modal) {
            throw Error('modal has been inited');
        }
        window.Modal = this;
        this.element = document.querySelector('.modal-box');
    }

    add(option: ModalOption): ModalItem {
        if (!('zIndex' in option)) {
            let length = this.list.length;
            option.zIndex = (length?this.list[length - 1].zIndex:100) + 1;
        }
        let item = new ModalItem(option);
        this.list.push(item);
        this.element.appendChild(item.body);
        return item;
    }

    remove(item: ModalItem): void {
        item.remove();
        let index = this.list.indexOf(item);
        this.list.splice(index, 1);
    }

    clear(): void {
        this.list = [];
        this.element.innerHTML = '';
    }
}

export default Modal;