import { ApolloClient } from "@apollo/client";
export default class RuntimeClient {
    #private;
    constructor(client: ApolloClient<any>);
    quit(): Promise<Boolean>;
    openLink(url: string): Promise<Boolean>;
}
