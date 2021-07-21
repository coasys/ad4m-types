import { ApolloClient } from "@apollo/client";
import { ExpressionRendered } from "./Expression";
export default class ExpressionClient {
    #private;
    constructor(client: ApolloClient<any>);
    get(url: string): Promise<ExpressionRendered>;
    getRaw(url: string): Promise<string>;
    create(content: any, languageAddress: string): Promise<string>;
}
