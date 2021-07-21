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
class NeighbourhoodClient {
    constructor(client) {
        _apolloClient.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, client);
    }
    async publishFromPerspective(perspectiveUUID, linkLanguage, meta) {
        const { neighbourhoodPublishFromPerspective } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation neighbourhoodPublishFromPerspective(
                $linkLanguage: String!,
                $meta: PerspectiveInput!,
                $perspectiveUUID: String!
            ) {
                neighbourhoodPublishFromPerspective(
                    linkLanguage: $linkLanguage,
                    meta: $meta,
                    perspectiveUUID: $perspectiveUUID
                )
            }`,
            variables: { perspectiveUUID, linkLanguage, meta: meta }
        }));
        return neighbourhoodPublishFromPerspective;
    }
    async joinFromUrl(url) {
        const { neighbourhoodJoinFromUrl } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `    mutation neighbourhoodJoinFromUrl($url: String!) {
                neighbourhoodJoinFromUrl(url: $url) {
                    uuid
                    name
                    sharedUrl
                }
            }`,
            variables: { url }
        }));
        return neighbourhoodJoinFromUrl;
    }
}
exports.default = NeighbourhoodClient;
_apolloClient = new WeakMap();
