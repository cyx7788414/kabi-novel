import Pagination from "../pagination/pagination";

class Bar {
    element: HTMLElement;
    pagination: Pagination;

    constructor(config: {
        element: HTMLElement,
        pagination: Pagination
    }) {
        this.element = config.element;
        this.pagination = config.pagination;

        this.element.innerHTML = `
                <div class="bar-progress"></div>
                <div class="bar-text"><span class="bar-current"></span>/<span class="bar-total"></span></div>
            `;
        
        let index: HTMLElement = this.element.querySelector('.bar-current');
        let total: HTMLElement = this.element.querySelector('.bar-total');
        let progress: HTMLElement = this.element.querySelector('.bar-progress');

        window.Bind.bindView(index, this.pagination, 'pageIndex', (value: number) => value + 1);
        window.Bind.bindView(total, this.pagination, 'pageLimit');

        // window.Bind.bindStyle(progress, this.pagination, 'pagePadding', 'height', (v: any) => `${v}px`)
    }
};

export default Bar;