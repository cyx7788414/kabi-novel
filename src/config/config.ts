class Config {
    element: HTMLElement;

    loadingMap: {[key: string]: boolean};

    displayText: string;

    constructor() {
        this.element = document.querySelector('.page.config');
        this.loadingMap = {};

        this.makeDisplayText();

        window.Bind.bindView(this.element.querySelector('.store-usage'), window.Store, 'usage');
        window.Bind.bindView(this.element.querySelector('.store-total'), window.Store, 'limit');

        window.Bind.bindView(this.element.querySelector('.font-size'), window.Layout, 'fontSize');
        window.Bind.bindView(this.element.querySelector('.line-height'), window.Layout, 'lineHeight');

        let display: HTMLElement = this.element.querySelector('.display .text p');
        window.Bind.bindView(display, this, 'displayText');
        window.Bind.bindStyle(display, window.Layout, 'fontSize', 'fontSize', (v: any) => `${v}px`);
        window.Bind.bindStyle(display, window.Layout, 'lineHeight', 'lineHeight', (v: any) => `${v}px`);

        this.checkApi();
    }

    makeDisplayText() {
        let text = '测试文本';

        let result = new Array(100).join(text);

        this.displayText = result;
    }

    checkApi() {

    }

    checkStore() {
        this.loadingMap.checkStore = true;

        window.Store.checkLimit();
    }
};

export default Config;