import * as LzString from 'lz-string';

class Store {
    data: any;

    limit: number;

    usage: number;

    constructor() {
        if (window.Store) {
            throw Error('store has been inited');
        }
        window.Store = this;

        this.checkUsage();
    }

    checkUsage(): void {
        this.usage = Object.keys(localStorage).map(v => v + localStorage.getItem(v)).join('').length;
    }

    checkLimit(): void {
        let base = this.usage;
        let addLength = 1000000;
        let index = 0;

        while (addLength > 10) {
            try {
                let key = `_test${index++}`;
                localStorage.setItem(key, Array.from(new Array(addLength - key.length)).map(v => 'a').join(''));    
                base += addLength;            
            } catch(e) {
                console.log(e);
                addLength = Math.round(addLength / 2);
            }
        }
        console.log(base);
    }
};

export default Store;