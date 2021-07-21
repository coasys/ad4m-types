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
class ExpressionClient {
    constructor(client) {
        _apolloClient.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, client);
    }
    async get(url) {
        const { expression } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query expression($url: String!) {
                expression(url: $url) {
                    author
                    timestamp
                    data
                    language {
                        address
                    }
                    proof {
                        valid
                        invalid
                    }
                }
            }`,
            variables: { url }
        }));
        return expression;
    }
    async getRaw(url) {
        const { expressionRaw } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query expressionRaw($url: String!) {
                expressionRaw(url: $url)
            }`,
            variables: { url }
        }));
        return expressionRaw;
    }
    async create(content, languageAddress) {
        content = JSON.stringify(content);
        const { expressionCreate } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation expressionCreate($content: String!, $languageAddress: String!){
                expressionCreate(content: $content, languageAddress: $languageAddress)
            }`,
            variables: { content, languageAddress }
        }));
        return expressionCreate;
    }
}
exports.default = ExpressionClient;
_apolloClient = new WeakMap();
