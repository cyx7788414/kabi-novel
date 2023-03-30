import Bar from '../common/bar/bar';
import { getSpecialParent } from '../common/common';
import Pagination from '../common/pagination/pagination';

class BookShelf {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    bookList: any[] = [];
    currentBook: any;


    loading: boolean = false;

    constructor() {
        this.element = document.querySelector('.page.bookshelf');
        
        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });

        this.bookList = JSON.parse(window.Store.get('bookshelf') || '[]');

        this.currentBook = JSON.parse(window.Store.get('currentBook') || 'undefined');

        window.Bind.bindView(this.element.querySelector('.book-list'), this, 'bookList', (booklist: any[]) => {
            let height = (this.element.querySelector('.pagination-box') as HTMLElement).offsetHeight / 4;
            let imgWidth = height * 3 / 4;
            let width = Math.floor((this.element.querySelector('.book-list') as HTMLElement).offsetWidth / 2);
            let html = `
                <style>
                    .book-item {height: ${height}px;}
                    .book-item .book-cover {width: ${imgWidth}px;}
                    .book-item .book-info {width: ${width - imgWidth - 30}px;}
                </style>
            `;
            booklist.forEach(book => {
                let date = new Date(book.latestChapterTime);
                html += `
                    <div class="book-item" key="${book.name}~!@#$%^&*${book.author}">
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

        window.Router.cbMap.bookshelf = () => {
            this.bookList = [].concat(this.bookList);
        };

        if (this.bookList.length === 0) {
            this.getBookShelf();
        }
    }

    getBookShelf(): void {
        if (this.loading === true) {
            window.Message.add({content: '正在加载书架数据'});
            return;
        }
        this.loading = true;
        window.Api.getBookshelf({
            success: (res: any) => {
                this.loading = false;
                this.bookList = [].concat(res.data).concat(res.data);
                window.Store.set('bookshelf', JSON.stringify(this.bookList));
            },
            error: (err: any) => {
                this.loading = false;
                // this.bookList = [];
            }
        });
    }

    clickItem(event: Event): void {
        let item = getSpecialParent((event.target || event.srcElement) as HTMLElement, (ele: HTMLElement) => {
            return ele.classList.contains('book-item');
        });
        let key = item.getAttribute('key').split('~!@#$%^&*');
        this.currentBook = this.bookList.filter(v => v.name === key[0] && v.author === key[1])[0] || null;
        window.Store.set('currentBook', JSON.stringify(this.currentBook));
        window.Router.go('article');
    }
};

export default BookShelf;