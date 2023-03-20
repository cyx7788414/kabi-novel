class Config {
    element: HTMLElement;

    loadingMap: {[key: string]: boolean};

    constructor() {
        this.element = document.querySelector('.page.config');
        this.loadingMap = {};

        window.Bind.bindView(this.element.querySelector('.store-usage'), window.Store, 'usage');
        window.Bind.bindView(this.element.querySelector('.store-total'), window.Store, 'limit');
    }

    checkStore() {
        this.loadingMap.checkStore = true;

        window.Store.checkLimit();
    }
};

export default Config;