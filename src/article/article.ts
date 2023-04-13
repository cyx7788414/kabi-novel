import Catalogue from "../catalogue/catalogue";
import Bar from "../common/bar/bar";
import { Book, CatalogueItem, Progress } from "../common/common";
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
            });
            return html;
        });

        window.Bind.bind(this, 'progress', (newV: any, oldV: any) => {
            window.Store.setObj(`p_${this.currentBook.id}`, newV);
        });

        const current: HTMLElement = this.element.querySelector('.current-info');
        const changeInfo = () => {
            return `${this.currentBook?.name} - ${this.currentBook?.author} - ${this.catalogue[this.progress?.index]?.title}`;
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

            // let base = this.element.offsetHeight - 230 - 20;
            // let height = base - base % window.Layout.lineHeight + 20;
            // console.log(v, height);
            window.Layout.lineHeight = window.Layout.lineHeight;

            this.catalogue = window.Store.getObj(`c_${current}`) || [];

            this.progress = window.Store.getObj(`p_${this.currentBook.id}`);

            this.content = window.Store.get(`a_${this.currentBook.id}_${this.progress.index}`) || '';
            
            if (!this.content) {
                this.getArticle();
            }
        };

        window.Router.cbMap.article = func;
        func();
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