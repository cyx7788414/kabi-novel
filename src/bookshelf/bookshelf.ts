import Bar from '../common/bar/bar';

class BookShelf {
    element: HTMLElement;
    bar: Bar;

    

    constructor() {
        this.element = document.querySelector('.page.bookshelf');
        this.bar = new Bar(this.element.querySelector('.bar'));
    }
};

export default BookShelf;