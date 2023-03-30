import Bar from "../common/bar/bar";
import Pagination from "../common/pagination/pagination";

class Catalogue {
    element: HTMLElement;
    bar: Bar;
    pagination: Pagination;

    currentBook: any;

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
            let height = this.element.querySelector('.pagination-box').clientHeight;
            let html = `
            `;
            list.forEach(article => {
                html += `
                    <div class="article-item" key="${article.index}">${article.title}</div>
                `;
            });
            window.setTimeout(() => {
                this.pagination.checkPage();
            });
            return html;
        });

        let func = () => {
            this.currentBook = JSON.parse(window.Store.get('currentBook') || 'undefined');

            if (window.Router.current === 'article' && !this.currentBook) {
                window.Router.go('bookshelf');
                return;
            }

            this.list = JSON.parse(window.Store.get(`${this.currentBook.name}-${this.currentBook.author}-catalogue`) || '[]');

            if (this.list.length === 0) {
                this.getCatalogue();
            }
        };

        window.Router.cbMap.catalogue = func;
        func();
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
                window.Store.set(`${this.currentBook.name}-${this.currentBook.author}-catalogue`, JSON.stringify(this.list));
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