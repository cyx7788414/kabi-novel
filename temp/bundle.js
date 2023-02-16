(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = require("./modal/modal");
function hello(compiler) {
    console.log("Hello from ".concat(compiler));
    document.write('123');
    (0, modal_1.modal)(compiler);
}
hello("TypeScript");

},{"./modal/modal":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modal = void 0;
function modal(name) {
    document.write('456');
    return "Hello from ".concat(name);
}
exports.modal = modal;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9yZWdpc3RyeS5ucG1taXJyb3IuY29tK2Jyb3dzZXItcGFja0A2LjEuMC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL21haW4udHMiLCJzcmMvbW9kYWwvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHVDQUFvQztBQUdwQyxTQUFTLEtBQUssQ0FBQyxRQUFnQjtJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFjLFFBQVEsQ0FBRSxDQUFDLENBQUM7SUFDdEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixJQUFBLGFBQUssRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7QUNScEIsU0FBZ0IsS0FBSyxDQUFDLElBQVk7SUFDOUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixPQUFPLHFCQUFjLElBQUksQ0FBRSxDQUFDO0FBQ2hDLENBQUM7QUFIRCxzQkFHQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7bW9kYWx9IGZyb20gJy4vbW9kYWwvbW9kYWwnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGhlbGxvKGNvbXBpbGVyOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKGBIZWxsbyBmcm9tICR7Y29tcGlsZXJ9YCk7XHJcbiAgICBkb2N1bWVudC53cml0ZSgnMTIzJyk7XHJcbiAgICBtb2RhbChjb21waWxlcik7XHJcbn1cclxuaGVsbG8oXCJUeXBlU2NyaXB0XCIpOyIsImV4cG9ydCBmdW5jdGlvbiBtb2RhbChuYW1lOiBzdHJpbmcpIHtcclxuICAgIGRvY3VtZW50LndyaXRlKCc0NTYnKTtcclxuICAgIHJldHVybiBgSGVsbG8gZnJvbSAke25hbWV9YDtcclxufSJdfQ==
