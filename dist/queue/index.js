"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linked_list_1 = require("../linked-list");
var Queue = /** @class */ (function () {
    function Queue() {
        this.list = new linked_list_1.default();
    }
    Queue.prototype.isEmpty = function () {
        return !this.list.head;
    };
    Queue.prototype.peek = function () {
        return this.isEmpty() ? null : this.list.head.value;
    };
    Queue.prototype.enqueue = function (value) {
        this.list.prepend(value);
    };
    Queue.prototype.dequeue = function () {
        return this.list.deleteTail();
    };
    Queue.prototype.toArray = function () {
        return this.list.toArray();
    };
    return Queue;
}());
exports.default = Queue;
