class Bind {
    cbMap: any = {};
    objIndex: number = 0;
    objMap: any = {};

    constructor() {
        if (window.Bind) {
            throw Error('bind has been inited');
        }
        window.Bind = this;
    }

    private handleObj(obj: any, prop: string) {
        if (!obj.hasOwnProperty('_bindId')) {
            obj._bindId = this.objIndex++;
        }
        if (this.cbMap[obj._bindId + prop]) {
            return;
        }
        let index = '_' + prop;
        obj[index] = obj[prop];
        this.cbMap[obj._bindId + prop] = [];
        Object.defineProperty(obj, prop, {
            get: () => {
                return obj[index];
            },
            set: (value: any) => {
                let temp = obj[index];
                obj[index] = value;
                this.run(obj, prop, value, temp);
            }
        })
    }

    bindInput(element: HTMLInputElement, obj: any, prop: string) {
        if (!element) {
            throw new Error('element is null');
        }
        this.bind(obj, prop, (newV: any, oldV: any) => {
            element.value = newV;
        }, true);
        element.onchange = (event: InputEvent) => {
            obj[prop] = (event.target as HTMLInputElement).value;
        };
    }

    bindStyle(element: HTMLElement, obj: any, prop: string, target: any, handle?: Function) {
        if (!element) {
            throw new Error('element is null');
        }
        this.bind(obj, prop, (newV: any, oldV: any) => {
            element.style[target] = handle?handle(newV, oldV):newV;
        }, true);
    }

    bindView(element: HTMLElement, obj: any, prop: string, formatter?: Function) {
        if (!element) {
            throw new Error('element is null');
        }
        this.bind(obj, prop, (newV: any, oldV: any) => {
            element.innerHTML = formatter?formatter(newV, oldV):newV;
        }, true);
    }

    bind(obj: any, prop: string, callback: Function, immediately?: boolean) {
        this.handleObj(obj, prop);
        this.cbMap[obj._bindId + prop].push(callback);
        immediately && callback(obj[prop], undefined);
    }

    run(obj: any, prop: string, newV?: any, oldV?: any) {
        this.cbMap[obj._bindId + prop].forEach((callback: Function) => {
            try {
                callback(newV, oldV);
            } catch (error) {
                throw error;
            }
        });
    }
};

export default Bind;