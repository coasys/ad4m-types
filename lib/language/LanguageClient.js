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
exports.LanguageClient = void 0;
const client_1 = require("@apollo/client");
const unwrapApolloResult_1 = __importDefault(require("../unwrapApolloResult"));
const LANGUAGE_COMPLETE = `
    name
    address
    settings
    icon { code }
    constructorIcon { code }
    settingsIcon { code }
`;
class LanguageClient {
    constructor(apolloClient) {
        _apolloClient.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, apolloClient);
    }
    async byAddress(address) {
        const { language } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query byAddress($address: String!) {
                language(address: $address) {
                    ${LANGUAGE_COMPLETE}
                }
            }`,
            variables: { address }
        }));
        return language;
    }
    async byFilter(filter) {
        const { languages } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query byFilter($filter: String!) {
                languages(filter: $filter) {
                    ${LANGUAGE_COMPLETE}
                }
            }`,
            variables: { filter }
        }));
        return languages;
    }
    async all() {
        return this.byFilter('');
    }
    async writeSettings(languageAddress, settings) {
        const { languageWriteSettings } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation writeSettings($languageAddress: String!, $settings: String!) {
                languageWriteSettings(languageAddress: $languageAddress, settings: $settings)
            }`,
            variables: { languageAddress, settings }
        }));
        return languageWriteSettings;
    }
    async cloneHolochainTemplate(languagePath, dnaNick, uid) {
        const { languageCloneHolochainTemplate } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation languageCloneHolochainTemplate(
                $languagePath: String!,
                $dnaNick: String!,
                $uid: String!
            ) {
                languageCloneHolochainTemplate(languagePath: $languagePath, dnaNick: $dnaNick, uid: $uid) {
                    name, address
                }
            }`,
            variables: { languagePath, dnaNick, uid }
        }));
        return languageCloneHolochainTemplate;
    }
}
exports.LanguageClient = LanguageClient;
_apolloClient = new WeakMap();
