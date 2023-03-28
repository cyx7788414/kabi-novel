class Router {

    current: string;

    pages: string[] = [];

    cbMap: {[key: string]: Function} = {};

    constructor(pages: string[]) {
        if (window.Router) {
            throw Error('router has been inited');
        }
        window.Router = this;

        this.pages = pages;

        let func = (event?: HashChangeEvent) => {
            let hash = window.location.hash;
            let index = hash.lastIndexOf('#');
            if (index > -1) {
                hash = hash.slice(index + 1);
            }
            if (this.pages.length === 0) {
                return;
            }
            if (this.pages.indexOf(hash) === -1) {
                window.location.hash = this.pages[0];
                return;
            }

            this.switchPage(hash);
        };
        window.onhashchange = func;
        func();
    }

    private switchPage(str: string) {
        document.querySelector('.show')?.classList.remove('show');
        document.querySelector(`.${str}`)?.classList.add('show');

        this.cbMap[str] && this.cbMap[str]();
    }

    go(target: string): void  {
        window.location.hash = target;
    }
}

export default Router;