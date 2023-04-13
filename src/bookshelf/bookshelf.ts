import Bar from '../common/bar/bar';
import { Book, getObject, getSpecialParent, Progress } from '../common/common';
import Pagination from '../common/pagination/pagination';

class BookShelf {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    bookMap: {[key: string]: Book} = {};
    bookList: Book[] = [];


    loading: boolean = false;

    pageHeight: number;

    constructor() {
        this.element = document.querySelector('.page.bookshelf');
        
        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });

        this.bookList = window.Store.getObj('bookshelf') || [];
        // this.bookList = window.Store.getByHead('b_').map(v => JSON.parse(window.Store.get(v) || ''));//wait

        window.Bind.bindView(this.element.querySelector('.book-list'), this, 'bookList', (bookList: Book[], oldV: Book[] = []) => {
            this.compareBookList(bookList, oldV);
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
            bookList.forEach(book => {
                let date = new Date(book.latestChapterTime);
                let progress: Progress = window.Store.getObj(`p_${book.id}`);
                html += `
                    <div class="book-item" key="${book.id}">
                        <div class="book-cover" style="background-image: url(${book.customCoverUrl});">
                            <img src="${book.coverUrl}" alt="${book.name}"/>
                        </div>
                        <div class="book-info">
                            <div class="book-name">${book.name}</div>
                            <div class="book-author">${book.author}</div>
                            <div class="book-dur">${progress.title}</div>
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

    }

    bookDelete(book: Book, onlySource?: boolean): void {
        if (!onlySource) {
            window.Store.del(`p_${book.id}`);
        }
        window.Store.del(`c_${book.id}`);
        window.Store.getByHead(`a_${book.id}`).forEach(v => window.Store.del(v));
    }

    compareBookList(newV: Book[], oldV: Book[]): void {
        let oldMap = this.bookMap;
        this.bookMap = {};
        newV.forEach(book => {
            this.bookMap[book.id] = book;
            if (oldMap[book.id]) {
                if (book.source !== oldMap[book.id].source) {
                    this.bookDelete(oldMap[book.id], true);
                }
                delete oldMap[book.id];
            }
        });
        Object.keys(oldMap).forEach((id: string) => {
            this.bookDelete(oldMap[id]);
        });
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
                let bookList: Book[] = res.data.map((book: any) => {
                    let id = window.Store.compress(`${book.name}_${book.author}`);
                    let keys: string[] = ['name', 'author', 'coverUrl', 'customCoverUrl', 'latestChapterTime', 'latestChapterTitle'];
                    let pobj: Progress = getObject(book, [], {
                        index: book.durChapterIndex,
                        pos: book.durChapterPos,
                        time: new Date(book.durChapterTime).getTime(),
                        title: book.durChapterTitle
                    });
                    let old = window.Store.getObj(`p_${id}`);
                    if (!old || old.time < pobj.time) {
                        window.Store.setObj(`p_${id}`, pobj);
                    }
                    return getObject(book, keys, {
                        id: id,
                        source: book.bookUrl
                    });
                });
                this.bookList = [].concat(bookList);
                window.Store.setObj('bookshelf', this.bookList);
            },
            error: (err: any) => {
                this.loading = false;
            }
        });
    }

    clickItem(event: Event): void {
        let item = getSpecialParent((event.target || event.srcElement) as HTMLElement, (ele: HTMLElement) => {
            return ele.classList.contains('book-item');
        });
        let id = item.getAttribute('key');
        window.Store.set('current', id);
        window.Router.go('article');
    }
};

export default BookShelf;