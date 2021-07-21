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
var _apolloClient, _perspectiveAddedCallbacks, _perspectiveUpdatedCallbacks, _perspectiveRemovedCallbacks;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const unwrapApolloResult_1 = __importDefault(require("../unwrapApolloResult"));
const LINK_EXPRESSION_FIELDS = `
author
timestamp
data { source, predicate, target }
proof { valid, invalid, signature, key }
`;
const PERSPECTIVE_HANDLE_FIELDS = `
uuid
name
sharedUrl
`;
class PerspectiveClient {
    constructor(client) {
        _apolloClient.set(this, void 0);
        _perspectiveAddedCallbacks.set(this, void 0);
        _perspectiveUpdatedCallbacks.set(this, void 0);
        _perspectiveRemovedCallbacks.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, client);
        __classPrivateFieldSet(this, _perspectiveAddedCallbacks, []);
        __classPrivateFieldSet(this, _perspectiveUpdatedCallbacks, []);
        __classPrivateFieldSet(this, _perspectiveRemovedCallbacks, []);
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                perspectiveAdded { ${PERSPECTIVE_HANDLE_FIELDS} }
            }   
        `
        }).subscribe({
            next: result => {
                __classPrivateFieldGet(this, _perspectiveAddedCallbacks).forEach(cb => {
                    cb(result.data.perspectiveAdded);
                });
            },
            error: (e) => console.error(e)
        });
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                perspectiveUpdated { ${PERSPECTIVE_HANDLE_FIELDS} }
            }   
        `
        }).subscribe({
            next: result => {
                __classPrivateFieldGet(this, _perspectiveUpdatedCallbacks).forEach(cb => {
                    cb(result.data.perspectiveUpdated);
                });
            },
            error: (e) => console.error(e)
        });
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                perspectiveRemoved
            }   
        `
        }).subscribe({
            next: result => {
                __classPrivateFieldGet(this, _perspectiveRemovedCallbacks).forEach(cb => {
                    cb(result.data.perspectiveRemoved);
                });
            },
            error: (e) => console.error(e)
        });
    }
    async all() {
        const { perspectives } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query perspectives {
                perspectives {
                    uuid
                    name
                    sharedUrl
                }
                
            }`
        }));
        return perspectives;
    }
    async byUUID(uuid) {
        const { perspective } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query perspective($uuid: String!) {
                perspective(uuid: $uuid) {
                    uuid
                    name
                    sharedUrl
                }
            }`,
            variables: { uuid }
        }));
        return perspective;
    }
    async snapshotByUUID(uuid) {
        const { perspectiveSnapshot } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query perspectiveSnapshot($uuid: String!) {
                perspectiveSnapshot(uuid: $uuid) {
                    links { ${LINK_EXPRESSION_FIELDS} }
                }
            }`,
            variables: { uuid }
        }));
        return perspectiveSnapshot;
    }
    async queryLinks(uuid, query) {
        const { perspectiveQueryLinks } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query perspectiveQueryLinks($uuid: String!, $query: LinkQuery!) {
                perspectiveQueryLinks(query: $query, uuid: $uuid) {
                    ${LINK_EXPRESSION_FIELDS}
                }
            }`,
            variables: { uuid, query }
        }));
        return perspectiveQueryLinks;
    }
    async add(name) {
        const { perspectiveAdd } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveAdd($name: String!) {
                perspectiveAdd(name: $name) {
                    ${PERSPECTIVE_HANDLE_FIELDS}
                }
            }`,
            variables: { name }
        }));
        return perspectiveAdd;
    }
    async update(uuid, name) {
        const { perspectiveUpdate } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveUpdate($uuid: String!, $name: String!) {
                perspectiveUpdate(uuid: $uuid, name: $name) {
                    ${PERSPECTIVE_HANDLE_FIELDS}
                }
            }`,
            variables: { uuid, name }
        }));
        return perspectiveUpdate;
    }
    async remove(uuid) {
        return unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveRemove($uuid: String!) {
                perspectiveRemove(uuid: $uuid)
            }`,
            variables: { uuid }
        }));
    }
    async addLink(uuid, link) {
        const { perspectiveAddLink } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveAddLink($uuid: String!, $link: LinkInput!){
                perspectiveAddLink(link: $link, uuid: $uuid) {
                    ${LINK_EXPRESSION_FIELDS}
                }
            }`,
            variables: { uuid, link }
        }));
        return perspectiveAddLink;
    }
    async updateLink(uuid, oldLink, newLink) {
        const { perspectiveUpdateLink } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveUpdateLink(
                $uuid: String!, 
                $newLink: LinkInput!
                $oldLink: LinkExpressionInput!
            ){
                perspectiveUpdateLink(
                    newLink: $newLink, 
                    oldLink: $oldLink, 
                    uuid: $uuid
                ) {
                    ${LINK_EXPRESSION_FIELDS}
                }
            }`,
            variables: { uuid, oldLink, newLink }
        }));
        return perspectiveUpdateLink;
    }
    async removeLink(uuid, link) {
        return unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation perspectiveRemoveLink($link: LinkExpressionInput!, $uuid: String!) {
                perspectiveRemoveLink(link: $link, uuid: $uuid)
            }`,
            variables: { uuid, link }
        }));
    }
    // Subscriptions:
    addPerspectiveAddedListener(cb) {
        __classPrivateFieldGet(this, _perspectiveAddedCallbacks).push(cb);
    }
    addPerspectiveUpdatedListener(cb) {
        __classPrivateFieldGet(this, _perspectiveUpdatedCallbacks).push(cb);
    }
    addPerspectiveRemovedListener(cb) {
        __classPrivateFieldGet(this, _perspectiveRemovedCallbacks).push(cb);
    }
    async addPerspectiveLinkAddedListener(uuid, cb) {
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                perspectiveLinkAdded(uuid: "${uuid}") { ${LINK_EXPRESSION_FIELDS} }
            }   
        `
        }).subscribe({
            next: result => {
                //@ts-ignore
                cb(result.data.perspectiveLinkAdded);
            },
            error: (e) => console.error(e)
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    async addPerspectiveLinkRemovedListener(uuid, cb) {
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                perspectiveLinkRemoved(uuid: "${uuid}") { ${LINK_EXPRESSION_FIELDS} }
            }   
        `
        }).subscribe({
            next: result => {
                //@ts-ignore
                cb(result.data.perspectiveLinkRemoved);
            },
            error: (e) => console.error(e)
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}
exports.default = PerspectiveClient;
_apolloClient = new WeakMap(), _perspectiveAddedCallbacks = new WeakMap(), _perspectiveUpdatedCallbacks = new WeakMap(), _perspectiveRemovedCallbacks = new WeakMap();
