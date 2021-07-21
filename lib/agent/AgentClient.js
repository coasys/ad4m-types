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
var _apolloClient, _updatedCallbacks;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const unwrapApolloResult_1 = __importDefault(require("../unwrapApolloResult"));
const Agent_1 = require("./Agent");
const AgentStatus_1 = require("./AgentStatus");
const AGENT_SUBITEMS = `
    did
    directMessageLanguage
    perspective { 
        links {
            author, timestamp, 
            proof {
                signature, key, valid, invalid
            }
            data {
                source, predicate, target
            }
        }
    }
`;
const AGENT_STATUS_FIELDS = `
    isInitialized
    isUnlocked
    did
    didDocument
`;
/**
 * Provides access to all functions regarding the local agent,
 * such as generating, locking, unlocking, importing the DID keystore,
 * as well as updating the publicly shared Agent expression.
 */
class AgentClient {
    constructor(client) {
        _apolloClient.set(this, void 0);
        _updatedCallbacks.set(this, void 0);
        __classPrivateFieldSet(this, _apolloClient, client);
        __classPrivateFieldSet(this, _updatedCallbacks, []);
        __classPrivateFieldGet(this, _apolloClient).subscribe({
            query: client_1.gql ` subscription {
                agentUpdated { ${AGENT_SUBITEMS} }
            }   
        `
        }).subscribe({
            next: result => {
                const agent = result.data.agentUpdated;
                __classPrivateFieldGet(this, _updatedCallbacks).forEach(cb => {
                    cb(agent);
                });
            },
            error: (e) => console.error(e)
        });
    }
    /**
     * Returns the Agent expression of the local agent as it is shared
     * publicly via the AgentLanguage.
     *
     * I.e. this is the users profile.
     */
    async me() {
        const { agent } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query agent { agent { ${AGENT_SUBITEMS} } }`
        }));
        let agentObject = new Agent_1.Agent(agent.did, agent.perspective);
        agentObject.directMessageLanguage = agent.directMessageLanguage;
        return agentObject;
    }
    async status() {
        const { agentStatus } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query agentStatus {
                agentStatus {
                    ${AGENT_STATUS_FIELDS}
                }
            }`
        }));
        return new AgentStatus_1.AgentStatus(agentStatus);
    }
    async generate(passphrase) {
        const { agentGenerate } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentGenerate(
                $passphrase: String!
            ) {
                agentGenerate(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase }
        }));
        return new AgentStatus_1.AgentStatus(agentGenerate);
    }
    async import(args) {
        let { did, didDocument, keystore, passphrase } = args;
        const { agentImport } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentImport(
                $did: String!,
                $didDocument: String!,
                $keystore: String!,
                $passphrase: String!
            ) {
                agentImport(did: $did, didDocument: $didDocument, keystore: $keystore, passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { did, didDocument, keystore, passphrase }
        }));
        return new AgentStatus_1.AgentStatus(agentImport);
    }
    async lock(passphrase) {
        const { agentLock } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentLock($passphrase: String!) {
                agentLock(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase }
        }));
        return new AgentStatus_1.AgentStatus(agentLock);
    }
    async unlock(passphrase) {
        const { agentUnlock } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentUnlock($passphrase: String!) {
                agentUnlock(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase }
        }));
        return new AgentStatus_1.AgentStatus(agentUnlock);
    }
    async byDID(did) {
        const { agentByDID } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).query({
            query: client_1.gql `query agentByDID($did: String!) {
                agentByDID(did: $did) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { did }
        }));
        return agentByDID;
    }
    async updatePublicPerspective(perspective) {
        const { agentUpdatePublicPerspective } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentUpdatePublicPerspective($perspective: PerspectiveInput!) {
                agentUpdatePublicPerspective(perspective: $perspective) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { perspective: perspective }
        }));
        const a = agentUpdatePublicPerspective;
        const agent = new Agent_1.Agent(a.did, a.perspective);
        agent.directMessageLanguage = a.directMessageLanguage;
        return agent;
    }
    async updateDirectMessageLanguage(directMessageLanguage) {
        const { agentUpdateDirectMessageLanguage } = unwrapApolloResult_1.default(await __classPrivateFieldGet(this, _apolloClient).mutate({
            mutation: client_1.gql `mutation agentUpdateDirectMessageLanguage($directMessageLanguage: String!) {
                agentUpdateDirectMessageLanguage(directMessageLanguage: $directMessageLanguage) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { directMessageLanguage }
        }));
        const a = agentUpdateDirectMessageLanguage;
        const agent = new Agent_1.Agent(a.did, a.perspective);
        agent.directMessageLanguage = a.directMessageLanguage;
        return agent;
    }
    addUpdatedListener(listener) {
        __classPrivateFieldGet(this, _updatedCallbacks).push(listener);
    }
}
exports.default = AgentClient;
_apolloClient = new WeakMap(), _updatedCallbacks = new WeakMap();
