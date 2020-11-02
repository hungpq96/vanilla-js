"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(value, next) {
        if (next === void 0) { next = null; }
        this.value = value;
        this.next = next;
    }
    ;
    Node.prototype.toString = function () {
        return "<Node: " + this.value.toString() + ">";
    };
    return Node;
}());
exports.default = Node;
