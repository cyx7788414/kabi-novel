class Router {

    current: string;

    pages: string[];

    constructor(pages: string[]) {
        if (window.Router) {
            throw Error('router has been inited');
        }
        window.Router = this;

        this.pages = pages;

        window.onhashchange = (event) => {
            console.log(event);
            let hash = window.location.hash;

            // this.go(this.pages.indexOf(hash) > -1?hash:this.pages[0]);
        }
    }

    go(target: string): void  {
        // window.location.hash = target;
    }
}

export default Router;