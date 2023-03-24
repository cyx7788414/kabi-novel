import Bar from '../common/bar/bar';
import Pagination from '../common/pagination/pagination';

class BookShelf {
    element: HTMLElement;
    bar: Bar;

    bookList: any[] = [];

    pagination: Pagination;

    constructor() {
        this.element = document.querySelector('.page.bookshelf');
        
        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });

        this.bookList = JSON.parse(window.Store.get('bookshelf')) || [];

        if (this.bookList.length === 0) {
            this.getBookShelf();
        }

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