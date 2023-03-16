import * as LzString from 'lz-string';

class Store {
    data: any;

    limit: number;

    private _usage: number;
    get usage(): number {
        return this.usage;
    }
    set usage(num: number) {
        this._usage = num;
    }

    constructor() {
        if (window.Store) {
            throw Error('store has been inited');
        }
        window.Store = this;

        this.checkUsage();
    }

    checkUsage(): void {
        this.usage = JSON.stringify(window.localStorage).length;
    }

    setLimit(limit: number): void {

    }

    checkLimit(): void {

    }
};

export default Store;