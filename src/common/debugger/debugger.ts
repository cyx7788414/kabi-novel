class Debugger {
    constructor() {
        window.onerror = function (error) {
            console.error(error);
        }
    }
};

export default Debugger;