import Bar from "../common/bar/bar";
import Pagination from "../common/pagination/pagination";

class Article {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: any;

    constructor() {
        this.element = document.querySelector('.page.article');

        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });


        let func = () => {
            this.currentBook = JSON.parse(window.Store.get('currentBook') || '""');
            if (window.Router.current === 'article' && !this.currentBook) {
                window.Router.go('bookshelf');
            }

            console.log(this.currentBook);
        };

        window.Router.cbMap.article = func;
        func();
    }
};

export default Article;