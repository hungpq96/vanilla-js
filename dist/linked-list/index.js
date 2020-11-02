"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
    }
    LinkedList.prototype.prepend = function (value) {
        var newNode = new node_1.default(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    };
    LinkedList.prototype.append = function (value) {
        var newNode = new node_1.default(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    };
    LinkedList.prototype.delete = function (value) {
        if (!this.head) {
            return null;
        }
        var deletedNode = null;
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        var currentNode = this.head;
        if (currentNode) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (this.tail.value === value) {
            this.tail = currentNode;
        }
        return deletedNode ? deletedNode.value : null;
    };
    LinkedList.prototype.find = function (value) {
        if (!this.head) {
            return null;
        }
        var currentNode = this.head;
        while (currentNode) {
            if (Array.isArray(value)
                && JSON.stringify(currentNode.value) === JSON.stringify(value)) {
                return currentNode;
            }
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    };
    LinkedList.prototype.deleteTail = function () {
        if (!this.head) {
            return null;
        }
        var deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail.value;
        }
        var currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            }
            else {
                currentNode = currentNode.next;
            }
        }
        this.tail = currentNode;
        return deletedTail ? deletedTail.value : null;
    };
    LinkedList.prototype.deleteHead = function () {
        if (!this.head) {
            return null;
        }
        var deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        }
        else {
            this.head = null;
            this.tail = null;
        }
        return deletedHead ? deletedHead.value : null;
    };
    LinkedList.prototype.fromArray = function (arr) {
        var _this = this;
        arr.forEach(function (val) { return _this.append(val); });
        return this;
    };
    LinkedList.prototype.toArray = function () {
        var nodes = [];
        var currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return nodes;
    };
    LinkedList.prototype.reverse = function () {
        if (!this.head) {
            return this;
        }
        var currentNode = this.head;
        var prevNode = null;
        var nextNode = null;
        while (currentNode) {
            // preserve ref to next node
            nextNode = currentNode.next;
            // move ref next to previous node instead
            currentNode.next = prevNode;
            // moving 1 step a head
            prevNode = currentNode;
            currentNode = nextNode;
        }
        this.tail = this.head;
        this.head = prevNode;
        return this;
    };
    return LinkedList;
}());
exports.default = LinkedList;
