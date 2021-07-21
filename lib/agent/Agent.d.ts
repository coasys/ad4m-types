import { Perspective } from "../perspectives/Perspective";
export declare class Agent {
    did: string;
    perspective?: Perspective;
    directMessageLanguage?: string;
    constructor(did: string, perspective?: Perspective);
}
declare const AgentExpression_base: any;
export declare class AgentExpression extends AgentExpression_base {
}
export {};
