import Pagination from "../pagination/pagination";

class Bar {
    element: HTMLElement;
    pagination: Pagination;
    percent: number;

    constructor(config: {
        element: HTMLElement,
        pagination: Pagination
    }) {
        this.element = config.element;
        this.pagination = config.pagination;
        this.percent = 0;

        this.element.innerHTML = `
                <div class="bar-progress"></div>
                <div class="bar-text"><span class="bar-current"></span>/<span class="bar-total"></span></div>
            `;
        
        let index: HTMLElement = this.element.querySelector('.bar-current');
        let total: HTMLElement = this.element.querySelector('.bar-total');
        let progress: HTMLElement = this.element.querySelector('.bar-progress');

        window.Bind.bindView(index, this.pagination, 'pageIndex', (value: number) => {
            let v = value + 1;
            this.percent = v / this.pagination.pageLimit;
            return v;
        });
        window.Bind.bindView(total, this.pagination, 'pageLimit', (value: number) => {
            this.percent = (this.pagination.pageIndex + 1) / value;
            return value;
        });

        window.Bind.bindStyle(progress, this, 'percent', 'width', (v: any) => `${v * 100}%`);

        this.element.onclick =(event: MouseEvent) => {
            let width = this.element.offsetWidth;
            let x = event.pageX;
            let index = Math.floor(this.pagination.pageLimit * x / width);
            this.pagination.setPage(index);
        };
    }
};

export default Bar;