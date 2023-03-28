import Bar from '../common/bar/bar';
import { getSpecialParent } from '../common/common';
import Pagination from '../common/pagination/pagination';

class BookShelf {
    element: HTMLElement;
    bar: Bar;

    bookList: any[] = [];
    currentBook: any;

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

        this.currentBook = JSON.parse(window.Store.get('currentBook')) || null;

        window.Bind.bindView(this.element.querySelector('.book-list'), this, 'bookList', (booklist: any[]) => {
            let height = this.element.querySelector('.pagination-box').clientHeight/ 4;
            let imgWidth = height * 3 / 4;
            let html = `
                <style>
                    .book-item {height: ${height}px;}
                    .book-item .book-cover {width: ${imgWidth}px;}
                    .book-item .book-info {width: calc(100% - ${imgWidth + 10}px);}
                </style>
            `;
            booklist.forEach(book => {
                let date = new Date(book.latestChapterTime);
                html += `
                    <div class="book-item" key="${book.name}-${book.author}">
                        <div class="book-cover" style="background-image: url(${book.customCoverUrl});">
                            <img src="${book.coverUrl}" alt="${book.name}"/>
                        </div>
                        <div class="book-info">
                            <div class="book-name">${book.name}</div>
                            <div class="book-author">${book.author}</div>
                            <div class="book-dur">${book.durChapterTitle}</div>
                            <div class="book-latest">${book.latestChapterTitle}</div>
                            <div class="book-latest-time">更新时间：${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}</div>
                        </div>
                    </div>
                `;
            });
            window.setTimeout(() => {
                this.pagination.checkPage();
            });
            return html;
        });

        if (this.bookList.length === 0) {
            this.getBookShelf();
        }
    }

    getBookShelf(): void {
        window.Api.getBookshelf({
            success: (res: any) => {
                this.bookList = [].concat(res.data).concat(res.data);
                console.log(this.bookList);
                window.Store.set('bookshelf', JSON.stringify(this.bookList));
            },
            error: (err: any) => {
                // this.bookList = [];
            }
        });
    }

    clickItem(event: Event): void {
        let item = getSpecialParent((event.target || event.srcElement) as HTMLElement, (ele: HTMLElement) => {
            return ele.classList.contains('book-item');
        });
        console.log(item, item.getAttribute('key'));

        // window.Api.getCatalogue()
    }
};

export default BookShelf;