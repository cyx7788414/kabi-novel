import Catalogue from "../catalogue/catalogue";
import Bar from "../common/bar/bar";
import { Book, CatalogueItem, changeValueWithNewObj, Progress } from "../common/common";
import Pagination from "../common/pagination/pagination";

class Article {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: Book;

    progress: Progress;

    catalogue: CatalogueItem[] = [];

    content: string;

    loading: boolean = false;

    constructor() {
        this.element = document.querySelector('.page.article');

        this.pagination = new Pagination({
            root: this.element.querySelector('.content')
        });
        
        this.bar = new Bar({
            element: this.element.querySelector('.bar'),
            pagination: this.pagination
        });

        window.Bind.bindView(this.element.querySelector('.content-inner'), this, 'content', (content: string) => {
            if (!content) {
                return '';
            }
            
            let html = `
                <style>
                </style>
            `;
            content.split('\n').map(v => {
                return v.trim()
            }).filter(v => !!v).forEach(v => {
                html += `
                    <p>${v}</p>
                `;
            });
            window.setTimeout(() => {
                this.pagination.checkPage();
                this.setPageByProgress();
            });
            return html;
        });

        window.Bind.bind(this, 'progress', (newV: any, oldV: any) => {
            if (!oldV) {
                return;
            }
            window.Store.setObj(`p_${this.currentBook.id}`, newV);
            if (this.progress.pos > this.content.length) {
                return;
            }
            window.Api.saveProgress(this.currentBook, this.progress);
        });

        const current: HTMLElement = this.element.querySelector('.current-info');
        const changeInfo = () => {
            return `${this.currentBook?.name} - ${this.currentBook?.author} - ${this.progress?.title}`;
        };
        window.Bind.bindView(current, this, 'currentBook', changeInfo);
        window.Bind.bindView(current, this, 'progress', changeInfo);
        window.Bind.bindView(current, this, 'catalogue', changeInfo);
        
        let content: HTMLElement = this.element.querySelector('.content');
        let contentInner: HTMLElement = content.querySelector('.content-inner');
        window.Bind.bindStyle(contentInner, window.Layout, 'fontSize', 'fontSize', (v: any) => `${v}px`);
        window.Bind.bindStyle(contentInner, window.Layout, 'lineHeight', 'lineHeight', (v: any) => `${v}px`);
        window.Bind.bindStyle(content, window.Layout, 'lineHeight', 'height', (v: any) => {
            if (!this.element.offsetHeight) {
                return '';
            }
            let base = this.element.offsetHeight - 230 - 20;
            let oo = base % window.Layout.lineHeight;
            if (oo < 10) {
                oo += window.Layout.lineHeight;
            }
            let height = base - oo + 20;
            current.style.height = `${oo}px`;
            current.style.lineHeight = `${oo}px`;
            window.setTimeout(() => this.pagination.checkPage());
            return `${height}px`;
        });

        let func = () => {
            let current = window.Store.get('current');
            this.currentBook = window.BookShelf.bookMap[current];
            if (!this.currentBook) {
                if (window.Router.current === 'article') {
                    window.Router.go('bookshelf');
                }
                return;
            }

            window.Layout.lineHeight = window.Layout.lineHeight;

            this.catalogue = window.Store.getObj(`c_${current}`) || [];

            this.progress = window.Store.getObj(`p_${this.currentBook.id}`);

            this.getContent();
        };

        window.Router.cbMap.article = func;
        func();
    }

    getContent(): void {
        this.content = window.Store.get(`a_${this.currentBook.id}_${this.progress.index}`) || '';
            
        if (!this.content) {
            this.getArticle();
        }
    }

    pageChange(num: 1 | -1): void  {
        let target = this.pagination.pageIndex + num;
        if (target < 0 || target >= this.pagination.pageLimit) {
            let index = this.progress.index + num;
            let pos = num === -1?999999999999:0;// to the end
            this.progress = changeValueWithNewObj(this.progress, {index: index, title: this.catalogue[index].title, time: new Date().getTime(), pos: pos});
            this.getContent();
        } else {
            this.pagination.setPage(target);
            this.getPagePos(target);
        }
    }

    getPagePos(target: number): void {
        let top = target * this.pagination.pageStep;
        let ps = this.element.querySelectorAll('.content-inner p');
        let str = '';
        for (let i = 0; i < ps.length; i++) {
            if ((ps[i] as HTMLElement).offsetTop >= top) {
                str = ps[i].innerHTML;
                break;
            }
        }
        let pos = this.content.indexOf(str);
        this.progress = changeValueWithNewObj(this.progress, {time: new Date().getTime(), pos: pos});
    }

    setPageByProgress(): void {
        let target = this.content.slice(0, this.progress.pos).split('\n').length - 1;
        let ele: HTMLElement = this.element.querySelectorAll('.content-inner p')[target] as HTMLElement;
        let top = ele.offsetTop;
        let index = Math.floor(top / this.pagination.pageStep);
        this.pagination.setPage(index);
        if (this.progress.pos > this.content.length) {//reset to right
            this.getPagePos(index);
        }
    }

    getArticle(): void {
        if (this.loading === true) {
            window.Message.add({content: '正在加载书架数据'});
            return;
        }
        this.loading = true;
        window.Api.getArticle(this.currentBook.source, this.progress.index, {
            success: (res: any) => {
                this.loading = false;
                this.content = res.data;
                window.Store.set(`a_${this.currentBook.id}_${this.progress.index}`, this.content);
            },
            error: (err: any) => {
                this.loading = false;
            }
        });
    }
};

export default Article;