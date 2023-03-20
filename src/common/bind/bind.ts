class Bind {
    cbMap: any;
    objIndex: number;
    objMap: any;

    constructor() {
        if (window.Bind) {
            throw Error('bind has been inited');
        }
        window.Bind = this;
        this.cbMap = {};
        this.objIndex = 0;
        this.objMap = {};
    }

    private handleObj(obj: any, prop: string) {
        if (!obj.hasOwnProperty('_bindId')) {
            obj._bindId = this.objIndex++;
        }
        if (this.cbMap[obj._bindId + prop]) {
            return;
        }
        let index = '_' + 'prop';
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

    bindView(element: HTMLElement, obj: any, prop: string) {
        this.bind(obj, prop, (newV: any) => {
            element.innerHTML = newV;
        }, true);
    }

    bind(obj: any, prop: string, callback: Function, immediately?: boolean) {
        this.handleObj(obj, prop);
        this.cbMap[obj._bindId + prop].push(callback);
        immediately && callback(obj[prop]);
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