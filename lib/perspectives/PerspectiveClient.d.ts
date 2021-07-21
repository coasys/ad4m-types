import { ApolloClient } from "@apollo/client";
import { Link, LinkExpressionInput, LinkExpression, LinkInput } from "../links/Links";
import { LinkQuery } from "./LinkQuery";
import { Perspective } from "./Perspective";
import { PerspectiveHandle } from "./PerspectiveHandle";
export declare type PerspectiveHandleCallback = (perspective: PerspectiveHandle) => null;
export declare type UuidCallback = (uuid: string) => null;
export declare type LinkCallback = (link: LinkExpression) => null;
export default class PerspectiveClient {
    #private;
    constructor(client: ApolloClient<any>);
    all(): Promise<PerspectiveHandle[]>;
    byUUID(uuid: string): Promise<PerspectiveHandle | null>;
    snapshotByUUID(uuid: string): Promise<Perspective | null>;
    queryLinks(uuid: string, query: LinkQuery): Promise<LinkExpression[]>;
    add(name: string): Promise<PerspectiveHandle>;
    update(uuid: string, name: string): Promise<PerspectiveHandle>;
    remove(uuid: string): Promise<{
        perspectiveRemove: boolean;
    }>;
    addLink(uuid: string, link: Link): Promise<LinkExpression>;
    updateLink(uuid: string, oldLink: LinkExpressionInput, newLink: LinkInput): Promise<LinkExpression>;
    removeLink(uuid: string, link: LinkExpressionInput): Promise<{
        perspectiveRemoveLink: boolean;
    }>;
    addPerspectiveAddedListener(cb: PerspectiveHandleCallback): void;
    addPerspectiveUpdatedListener(cb: PerspectiveHandleCallback): void;
    addPerspectiveRemovedListener(cb: UuidCallback): void;
    addPerspectiveLinkAddedListener(uuid: String, cb: LinkCallback): Promise<void>;
    addPerspectiveLinkRemovedListener(uuid: String, cb: LinkCallback): Promise<void>;
}
