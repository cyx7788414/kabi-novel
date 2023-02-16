import {modal} from './modal/modal';


function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
    document.write('123');
    modal(compiler);
}
hello("TypeScript");