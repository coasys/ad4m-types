"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _apolloClient;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const unwrapApolloResult_1 = __importDefault(require("../unwrapApolloResult"));
class RuntimeClient {
    constructor(client) {
        _apolloClient.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, client);
    }
    async quit() {
        const result = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation runtimeQuit { runtimeQuit }`
        }));
        return result.runtimeQuit;
    }
    async openLink(url) {
        const { runtimeOpenLink } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation runtimeOpenLink($url: String!) {
                runtimeOpenLink(url: $url)
            }`,
            variables: { url }
        }));
        return runtimeOpenLink;
    }
}
exports.default = RuntimeClient;
_apolloClient = new WeakMap();
