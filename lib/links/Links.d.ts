export declare class Link {
    source: string;
    target: string;
    predicate?: string;
    constructor(obj: any);
}
export declare class LinkInput {
    source: string;
    target: string;
    predicate?: string;
}
declare const LinkExpression_base: any;
export declare class LinkExpression extends LinkExpression_base {
}
declare const LinkExpressionInput_base: any;
export declare class LinkExpressionInput extends LinkExpressionInput_base {
}
export declare function linkEqual(l1: LinkExpression, l2: LinkExpression): boolean;
export declare function isLink(l: any): boolean;
export declare function hashLinkExpression(link: LinkExpression): number;
export {};
