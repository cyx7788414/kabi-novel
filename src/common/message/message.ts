import { strToDom } from '../common';

interface MessageOption {
    content: string;
    onOk?: Function;
    onCancle?: Function;
    banAutoRemove?: boolean;
};

class MessageItem {
    body: Element;
    constructor(option: MessageOption) {
        let str = `
            <div class="message">
                <div class="message-content">
                </div>
            </div>
        `;
        let message: Element = strToDom(str)[0];
        this.body = message;
        let content: HTMLDivElement = message.querySelector('.message-content');
        content.innerHTML = option.content;

        content.onclick = () => {
            option.onOk && option.onOk();
            this.remove();
        };

        if (option.banAutoRemove) {
            return;
        }

        window.setTimeout(() => {
            option.onCancle && option.onCancle();
            this.remove();
        }, 2000);
    }

    remove() {
        let parent = this.body.parentElement;
        parent && parent.removeChild(this.body);
    }
};

class Message {
    element: HTMLElement;
    list: any[];
    constructor() {
        if (window.Message) {
            throw Error('modal has been inited');
        }
        this.list = [];
        window.Message = this;
        this.element = document.querySelector('.message-box');
    }

    add(option: MessageOption) {
        let item = new MessageItem(option);
        this.list.push(item);
        this.element.appendChild(item.body);
        return item;
    }

    remove(item: MessageItem): void {
        item.remove();
        let index = this.list.indexOf(item);
        this.list.splice(index, 1);
    }

    clear(): void {
        this.list = [];
        this.element.innerHTML = '';
    }
};

export default Message;