import { ApolloClient } from "@apollo/client";
import { PerspectiveInput } from "../perspectives/Perspective";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus";
export interface InitializeArgs {
    did: string;
    didDocument: string;
    keystore: string;
    passphrase: string;
}
export declare type AgentUpdatedCallback = (agent: Agent) => null;
/**
 * Provides access to all functions regarding the local agent,
 * such as generating, locking, unlocking, importing the DID keystore,
 * as well as updating the publicly shared Agent expression.
 */
export default class AgentClient {
    #private;
    constructor(client: ApolloClient<any>);
    /**
     * Returns the Agent expression of the local agent as it is shared
     * publicly via the AgentLanguage.
     *
     * I.e. this is the users profile.
     */
    me(): Promise<Agent>;
    status(): Promise<AgentStatus>;
    generate(passphrase: string): Promise<AgentStatus>;
    import(args: InitializeArgs): Promise<AgentStatus>;
    lock(passphrase: string): Promise<AgentStatus>;
    unlock(passphrase: string): Promise<AgentStatus>;
    byDID(did: string): Promise<Agent>;
    updatePublicPerspective(perspective: PerspectiveInput): Promise<Agent>;
    updateDirectMessageLanguage(directMessageLanguage: string): Promise<Agent>;
    addUpdatedListener(listener: any): void;
}
