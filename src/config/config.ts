import {makeDisplayText} from '../common/common';

class Config {
    element: HTMLElement;

    displayText: string;

    url: string;

    constructor() {
        this.element = document.querySelector('.page.config');

        this.url = window.Api.url;

        this.displayText = makeDisplayText(200);

        window.Bind.bindInput(this.element.querySelector('.url input'), this, 'url');

        window.Bind.bindView(this.element.querySelector('.store-usage'), window.Store, 'usage');
        window.Bind.bindView(this.element.querySelector('.store-total'), window.Store, 'limit');
        window.Bind.bindView(this.element.querySelector('.store-percent'), window.Store, 'percent', (v: number) => `  ( ${v}% )`);

        window.Bind.bindView(this.element.querySelector('.font-size'), window.Layout, 'fontSize');
        window.Bind.bindView(this.element.querySelector('.line-height'), window.Layout, 'lineHeight');

        let display: HTMLElement = this.element.querySelector('.display .text p');
        window.Bind.bindView(display, this, 'displayText');
        window.Bind.bindStyle(display, window.Layout, 'fontSize', 'fontSize', (v: any) => `${v}px`);
        window.Bind.bindStyle(display, window.Layout, 'lineHeight', 'lineHeight', (v: any) => `${v}px`);

        if (!this.url) {
            window.Message.add({content: '当前未配置服务器地址'});
        } else {
            this.checkUrl();
        }
    }


    checkUrl() {
        window.Api.checkUrl(this.url);
    }
};

export default Config;