import { ApolloClient } from "@apollo/client";
import { Address } from "../Address";
import { Perspective } from "../perspectives/Perspective";
import { PerspectiveHandle } from "../perspectives/PerspectiveHandle";
export default class NeighbourhoodClient {
    #private;
    constructor(client: ApolloClient<any>);
    publishFromPerspective(perspectiveUUID: string, linkLanguage: Address, meta: Perspective): Promise<string>;
    joinFromUrl(url: string): Promise<PerspectiveHandle>;
}
