class Debugger {
    constructor() {
        window.onerror = function (error) {
            console.error(error);

            window.Modal && window.Modal.add({
                content: error.toString()
            });
        }
    }
};

export default Debugger;