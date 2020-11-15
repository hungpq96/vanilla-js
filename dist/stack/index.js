"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linked_list_1 = require("../linked-list");
var Stack = /** @class */ (function () {
    function Stack() {
        this.list = new linked_list_1.default();
    }
    Stack.prototype.isEmpty = function () {
        return !this.list.head;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.list.head.value;
    };
    Stack.prototype.push = function (value) {
        this.list.prepend(value);
    };
    Stack.prototype.pop = function () {
        return this.list.deleteHead();
    };
    Stack.prototype.toArray = function () {
        return this.list.toArray();
    };
    return Stack;
}());
exports.default = Stack;
