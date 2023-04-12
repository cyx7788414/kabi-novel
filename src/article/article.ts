import Bar from "../common/bar/bar";
import { Book, Progress } from "../common/common";
import Pagination from "../common/pagination/pagination";

class Article {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: Book;

    progress: Progress;

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
        
        let content: HTMLElement = this.element.querySelector('.content-inner');
        window.Bind.bindStyle(content, window.Layout, 'fontSize', 'fontSize', (v: any) => `${v}px`);
        window.Bind.bindStyle(content, window.Layout, 'lineHeight', 'lineHeight', (v: any) => `${v}px`);

        let func = () => {
            this.currentBook = window.BookShelf.bookMap[window.Store.get('current')];
            if (window.Router.current === 'article' && !this.currentBook) {
                window.Router.go('bookshelf');
                return;
            }

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