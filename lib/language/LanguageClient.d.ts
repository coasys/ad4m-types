import { ApolloClient } from "@apollo/client";
import { LanguageHandle } from "./LanguageHandle";
import { LanguageRef } from "./LanguageRef";
export declare class LanguageClient {
    #private;
    constructor(apolloClient: ApolloClient<any>);
    byAddress(address: string): Promise<LanguageHandle>;
    byFilter(filter: string): Promise<LanguageHandle[]>;
    all(): Promise<LanguageHandle[]>;
    writeSettings(languageAddress: string, settings: string): Promise<Boolean>;
    cloneHolochainTemplate(languagePath: string, dnaNick: string, uid: string): Promise<LanguageRef>;
}
