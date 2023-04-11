import Bar from "../common/bar/bar";
import { Book, Progress } from "../common/common";
import Pagination from "../common/pagination/pagination";

class Catalogue {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: Book;
    progress: Progress;

    linePerPage: number;

    list: any[] = [];

    loading: boolean = false;

    constructor() {
        this.element = document.querySelector('.page.catalogue');

        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });

        window.Bind.bindView(this.element.querySelector('.article-list'), this, 'list', (list: any[]) => {
            let height = (this.element.querySelector('.pagination-box') as HTMLElement).offsetHeight;
            this.linePerPage = Math.round(height / 80);
            let line = height / this.linePerPage;
            let html = `
                <style>
                    .article-item {line-height: ${line}px;}
                </style>
            `;
            list.forEach((article, index) => {
                html += `
                    <div class="article-item " key="${article.index}">${article.title}</div>
                `;
            });
            window.setTimeout(() => {
                this.checkCurrent();
                this.pagination.checkPage();
            });
            return html;
        });

        let func = () => {
            this.currentBook = window.BookShelf.bookMap[window.Store.get('current')];

            if (window.Router.current === 'article' && !this.currentBook) {
                window.Router.go('bookshelf');
                return;
            }
            
            this.progress = window.Store.getObj(`p_${this.currentBook.id}`);

            this.list = window.Store.getObj(`c_${this.currentBook.id}`) || [];
            
            if (this.list.length === 0) {
                this.getCatalogue();
            }
        };

        window.Router.cbMap.catalogue = func;
        func();
    }

    checkCurrent(): void {
        this.element.querySelector('.article-item.current')?.classList.remove('current');
        this.element.querySelectorAll('.article-item')[this.progress.index]?.classList.add('current');

        this.pagination.setPage(Math.floor(this.progress.index / (this.linePerPage * 2)));
    }

    getCatalogue(): void {
        if (this.loading === true) {
            window.Message.add({content: '正在加载书架数据'});
            return;
        }
        this.loading = true;
        window.Api.getCatalogue(this.currentBook.bookUrl, {
            success: (res: any) => {
                this.loading = false;
                this.list = res.data;
                window.Store.setObj(`c_${this.currentBook.id}`, this.list);
            },
            error: (err: any) => {
                this.loading = false;
            }
        });
    }

    clickItem(event: Event): void {
        console.log(event);
    }
};

export default Catalogue;