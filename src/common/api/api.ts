class Api {
    url: string;

    apiMap: {[key: string]: string} = {
            bookshelf: '/getBookshelf',
            catalogue: '/getChapterList',
            article: '/getBookContent'
        };

    constructor() {
        if (window.Api) {
            throw Error('api has been inited');
        }
        window.Api = this;

        this.url = window.Store.get('url') || '';
    }

    getBookshelf(cb?: {success?: Function, error?: Function}): void {
        this.get(this.url + this.apiMap.bookshelf, {}, {
            success: (data: any) => {
                cb && cb.success && cb.success(data);
            },
            error: (err: any) => {
                console.log(err);
                cb && cb.error && cb.error(err);
                window.Message.add({content: '获取书架内容失败'});
            }
        });
    }

    get(url: string, data: { [key: string]: any }, cb?: {success?: Function, error?: Function, check?: boolean}) {
        if (!this.url && !(cb && cb.check)) {
            window.Message.add({content: '当前未配置服务器地址'});
            cb && cb.error && cb.error(null);
            return;
        }

        // 创建 XMLHttpRequest，相当于打开浏览器
        const xhr = new XMLHttpRequest()

        // 打开一个与网址之间的连接   相当于输入网址
        // 利用open（）方法，第一个参数是对数据的操作，第二个是接口
        xhr.open("GET", `${url}?${Object.keys(data).map(v => `${v}=${data[v]}`).join('&')}`);

        // 通过连接发送请求  相当于点击回车或者链接
        xhr.send(null);

        // 指定 xhr 状态变化事件处理函数   相当于处理网页呈现后的操作
        // 全小写
        xhr.onreadystatechange = function () {
            // 通过readyState的值来判断获取数据的情况
            if (this.readyState === 4) {
                // 响应体的文本 responseText
                let response;
                try {
                    response = JSON.parse(this.responseText);
                } catch(e) {
                    response = this.responseText;
                }
                if (this.status === 200) {
                    cb && cb.success && cb.success(response);
                } else {
                    cb && cb.error && cb.error(response);
                }
            }
        }
    }

    setUrl(url: string) {
        this.url = url;
        window.Store.set('url', url);
    }

    checkUrl(url: string) {
        this.get(url + this.apiMap.bookshelf, {}, {
            success: (data: any) => {
                window.Message.add({content: '服务器地址测试成功'});
                this.setUrl(url);
            },
            error: (err: any) => {
                console.log(err);
                window.Message.add({content: '服务器地址测试失败'});
            },
            check: true
        });
    }
};

export default Api;