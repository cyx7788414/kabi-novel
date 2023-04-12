function strToDom(str: string): HTMLCollection {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.children;
}

function makeDisplayText(time: number): string {
    let text = '测试文本';

    let result = new Array(time + 1).join(text);

    return result;
}

function getSpecialParent(ele: HTMLElement,checkFun: Function): HTMLElement | null {
    if (ele && ele !== document as unknown && checkFun(ele)) {
        return ele;
    }
    let parent = ele.parentElement || ele.parentNode;
    return parent?getSpecialParent(parent as HTMLElement, checkFun):null;
}

function getObject(source: any, keys: string[], others?: {[key: string]: any}): any {
    let obj: any = {};
    keys.forEach(key => {
        obj[key] = source[key];
    });
    others && Object.keys(others).forEach(key => {
        obj[key] = others[key];
    });
    return obj;
}

function changeValueWithNewObj(obj: any, attr: string, value: any): any {
    let result = JSON.parse(JSON.stringify(obj));
    result[attr] = value;
    return result;
}

interface Book {
    id: string;
    source: string;
    name: string;
    author: string;
    bookUrl: string;
    coverUrl: string;
    customCoverUrl: string;
    durChapterTitle: string;
    latestChapterTime: string;
    latestChapterTitle: string;
}

interface Progress {
    index: number;
    pos: number;
    time: number;
}


export { strToDom, makeDisplayText, getSpecialParent, getObject, changeValueWithNewObj, Book, Progress };