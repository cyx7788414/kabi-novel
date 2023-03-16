class Bind {
    obj: any;

    constructor() {
        if (window.Bind) {
            throw Error('bind has been inited');
        }
        window.Bind = this;
    }

    getValue(target: string) {
        let arr = target.split('.');
        let value = window;
        for (let i = 0; i < arr.length; i++) {
            if (!value && value !== 0 && value !== '') {
                value = value[arr[i]];
            }
        }
    }

    bindView(element: HTMLElement, target: string) {
        this.bind(target, (newV: any) => {
            element.innerHTML = newV;
        }, true);
    }

    bind(target: string, callback: Function, immediately?: boolean) {
        if (!this.obj.target) {
            this.obj[target] = [];
        }
        this.obj.target.push(callback);
        immediately && callback();
    }

    run(target: string, newV?: any, oldV?: any) {
        this.obj[target].forEach((callback: Function) => {
            try {
                callback(newV, oldV);
            } catch (error) {
                throw error;
            }
        });
    }
};

export default Bind;