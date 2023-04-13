import Bar from "../common/bar/bar";
import { Book, CatalogueItem, changeValueWithNewObj, getSpecialParent, Progress } from "../common/common";
import Pagination from "../common/pagination/pagination";

class Catalogue {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: Book;
    progress: Progress;

    linePerPage: number;

    list: CatalogueItem[] = [];

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

        const current: HTMLElement = this.element.querySelector('.current-info');
        const content: HTMLElement = this.element.querySelector('.content');
        window.Bind.bindView(this.element.querySelector('.article-list'), this, 'list', (list: any[]) => {
            // let height = (this.element.querySelector('.pagination-box') as HTMLElement).offsetHeight;
            let height = this.element.offsetHeight - 230 - 20;
            let oo = height % 80;
            if (oo < 10) {
                oo += 80;
            }
            this.linePerPage = Math.round((height - oo) / 80);
            current.style.height = `${oo}px`;
            current.style.lineHeight = `${oo}px`;
            content.style.height = `${height - oo + 20}px`;
            // this.linePerPage = Math.round(height / 80);
            // let line = height / this.linePerPage;
            let html = `
                <style>
                    .article-item {line-height: 80px;}
                </style>
            `;
            list.forEach((article, index) => {
                html += `
                    <div class="article-item " key="${article.index}">${article.title}</div>
                `;
            });
            window.setTimeout(() => {
                this.pagination.checkPage();
                this.checkCurrent();
            });
            return html;
        });

        window.Bind.bindView(current, this, 'currentBook', () => {
            return `${this.currentBook?.name} - ${this.currentBook?.author}`;
        });

        window.Bind.bind(this, 'progress', (newV: any, oldV: any) => {
            window.Store.setObj(`p_${this.currentBook.id}`, newV);
        });


        let func = () => {
            this.currentBook = window.BookShelf.bookMap[window.Store.get('current')];

            if (!this.currentBook) {
                if (window.Router.current === 'catalogue') {
                    window.Router.go('bookshelf');
                }
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
        if (!this.progress || !this.currentBook) {
            return;
        }
        this.element.querySelector('.article-item.current')?.classList.remove('current');
        this.element.querySelector(`.article-item[key="${this.progress.index}"]`)?.classList.add('current');

        let items = this.element.querySelectorAll('.article-item');
        let caches = window.Store.getByHead(`a_${this.currentBook.id}_`).map(v => {
            let arr = v.split('_');
            return arr[arr.length - 1];
        });
        caches.forEach((index) => {
            items[parseInt(index)]?.classList.add('cached');
        });
        this.pagination.setPage(Math.floor(this.progress.index / (this.linePerPage * 2)));
    }

    getCatalogue(): void {
        if (this.loading === true) {
            window.Message.add({content: '正在加载书架数据'});
            return;
        }
        this.loading = true;
        window.Api.getCatalogue(this.currentBook.source, {
            success: (res: any) => {
                this.loading = false;
                this.list = res.data.map((v: any) => {
                    return {
                        index: v.index,
                        title: v.title     
                    };
                });
                window.Store.setObj(`c_${this.currentBook.id}`, this.list);
            },
            error: (err: any) => {
                this.loading = false;
            }
        });
    }

    clickItem(event: Event): void {
        // console.log(event);
        let item = getSpecialParent((event.target || event.srcElement) as HTMLElement, (ele: HTMLElement) => {
            return ele.classList.contains('article-item');
        });
        let index = parseInt(item.getAttribute('key'));
        changeValueWithNewObj(this.progress, {index: index, title: this.list[index].title, time: new Date().getTime(), pos: 0});
        window.setTimeout(() => {
            window.Router.go('article');
        });
    }
};

export default Catalogue;