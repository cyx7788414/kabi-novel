import * as axios from 'axios';

class Api {
    url: string;

    constructor() {
        if (window.Api) {
            throw Error('api has been inited');
        }
        window.Api = this;

        this.url = window.Store.get('url') || '';

        console.log(axios)
    }

    setUrl(url: string) {
        this.url = url;
        window.Store.set('url', url);
    }

    checkUrl(url: string) {

    }
};

export default Api;