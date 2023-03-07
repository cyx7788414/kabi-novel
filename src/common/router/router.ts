class Router {
    constructor() {
        // if (window.Router) {
        //     throw Error('router has been inited');
        // }
        // window.Router = this;
        window.onhashchange = (event) => {
            console.log(event);
        }
    }
}

export default Router;