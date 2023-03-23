import Bar from '../common/bar/bar';
import { makeDisplayText } from '../common/common';

class BookShelf {
    element: HTMLElement;
    bar: Bar;

    bookList: any[];

    test: string;

    constructor() {
        this.element = document.querySelector('.page.bookshelf');
        // this.bar = new Bar(this.element.querySelector('.bar'));

        this.bookList = JSON.parse(window.Store.get('bookshelf')) || [];

        this.test = makeDisplayText(1000);

        window.Bind.bindView(this.element.querySelector('.booklist'), this, 'test');

        if (this.bookList.length === 0) {
            this.getBookShelf();
        }

        window.setInterval(() => {
            // window.Message.add({content: 'scrollWidth' + this.element.querySelector('.booklist').scrollWidth});
            this.element.querySelector('.content').scrollLeft = 100;
        }, 3000);

        this.element.querySelector('.content').scrollLeft = 100;
    }

    getBookShelf(): void {
        window.Api.getBookshelf({
            success: (res: any) => {
                this.bookList = res.data;
                console.log(this.bookList);
            },
            error: (err: any) => {
                this.bookList = [];
            }
        });
    }
};

export default BookShelf;