class Pagination {
    root: HTMLElement;
    box: HTMLElement;
    padding: HTMLElement;

    pageStep: number;

    pageIndex: number = 0;

    pageLimit: number = 1;

    pagePadding: number = 0;

    constructor(config: {
        root: HTMLElement        
    }) {
        this.root = config.root;
        this.handleHtml(config.root);

        this.pageStep = this.box.offsetHeight;

        this.checkPage();
        
        window.Bind.bindStyle(this.padding, this, 'pagePadding', 'height', (v: any) => `${v}px`);
        window.Bind.bind(this, 'pageIndex', (value: number) => {
            this.box.scrollTop = this.pageStep * value;
        });
    }  
    
    private handleHtml(root: HTMLElement) {
        let inner = root.innerHTML;
        root.innerHTML = `
            <div class="pagination-box">
                <div class="pagination-body">
                    <div class="pagination-content"></div>
                    <div class="pagination-padding"></div>
                </div>
            </div>`;
        let content: HTMLElement = root.querySelector('.pagination-content');
        content.innerHTML = inner;
        this.box = root.querySelector('.pagination-box');
        this.padding = root.querySelector('.pagination-padding');
    }

    checkPage(): void {
        this.pageLimit = Math.ceil(this.box.scrollHeight / this.pageStep) || 1;
        this.pagePadding = this.pageStep * this.pageLimit - this.box.scrollHeight;
    }

    setPage(num: number) {
        let target = num;
        if (num < 0) {
            target = 0;
        }
        if (num >= this.pageLimit) {
            target = this.pageLimit - 1;
        }
        this.pageIndex = target;
    }

    pageChange(add: number) {
        this.setPage(this.pageIndex + add);
    }
};

export default Pagination;