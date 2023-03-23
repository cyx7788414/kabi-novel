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


export { strToDom, makeDisplayText };