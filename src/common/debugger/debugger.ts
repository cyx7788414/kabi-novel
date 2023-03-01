class Debugger {
    constructor() {
        window.onerror = function (error) {
            console.error(error);

            window.Modal && window.Modal.add('123')
        }
    }
};

export default Debugger;