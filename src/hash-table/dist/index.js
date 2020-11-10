"use strict";
exports.__esModule = true;
var linked_list_1 = require("../linked-list");
var DEFAULT_HASH_TABLE_SIZE = 32;
var HashTable = /** @class */ (function () {
    function HashTable(hashTableSize) {
        if (hashTableSize === void 0) { hashTableSize = DEFAULT_HASH_TABLE_SIZE; }
        this.buckets = Array(hashTableSize)
            .fill(null)
            .map(function () { return new linked_list_1["default"](); });
        this.keys = {};
    }
    HashTable.prototype.hash = function (key) {
        var hash = Array
            .from(key)
            .reduce(function (prev, curr) { return prev + curr.charCodeAt(0); }, 0);
        return hash % this.buckets.length;
    };
    HashTable.prototype.set = function (key, value) {
        var keyHash = this.hash(key);
        this.keys[key] = keyHash;
        var bucket = this.buckets[keyHash];
        var node = bucket.find(null, function (nodeValue) { return nodeValue.key === key; });
        if (!node) {
            bucket.append({ key: key, value: value });
        }
        else {
            node.value.value = value;
        }
    };
    HashTable.prototype.get = function (key) {
        var keyHash = this.hash(key);
        var bucket = this.buckets[keyHash];
        var node = bucket.find(null, function (nodeValue) { return nodeValue.key === key; });
        return node ? node.value.value : undefined;
    };
    HashTable.prototype["delete"] = function (key) {
        var keyHash = this.hash(key);
        delete this.keys[keyHash];
        var bucket = this.buckets[keyHash];
        var node = bucket.find(null, function (nodeValue) { return nodeValue.key === key; });
        if (node) {
            return bucket["delete"](node.value);
        }
        return null;
    };
    HashTable.prototype.has = function (key) {
        return this.keys.hasOwnProperty(key);
    };
    HashTable.prototype.getKeys = function () {
        return Object.keys(this.keys);
    };
    return HashTable;
}());
exports["default"] = HashTable;
