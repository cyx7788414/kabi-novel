interface LayoutInterface {
    fontSize: number;
    lineHeight: number;
};

class Layout {

    fontSize: number;

    lineHeight: number;

    limit: LayoutInterface;
    base: LayoutInterface;

    constructor() {
        if (window.Layout) {
            throw Error('layout has been inited');
        }
        window.Layout = this;

        this.limit = {
            fontSize: 20,
            lineHeight: 24
        };

        this.base = {
            fontSize: 30,
            lineHeight: 40
        };

        this.fontSize = parseInt(window.Store.get('fontSize') || this.base.fontSize.toString());
        this.lineHeight = parseInt(window.Store.get('lineHeight') || this.base.lineHeight.toString());
    }

    set(target: 'fontSize' | 'lineHeight', value?: number): void {
        this[target] = value || this.base[target];
        window.Store.set(target, this[target].toString());
    }

    add(target: 'fontSize' | 'lineHeight', num: number): void {
        let current = this[target];
        current += num;

        if (current < this.limit[target]) {
            current = this.limit[target];
        }

        this.set(target, current);
    }

    reset(target?: 'fontSize' | 'lineHeight'): void {
        if (target) {
            this.set(target);
            return;
        }
        this.set('fontSize');
        this.set('lineHeight');
    }
};

export default Layout;