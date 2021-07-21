import { LinkExpression, LinkExpressionInput } from "../links/Links";
export declare class Perspective {
    links: LinkExpression[];
    constructor(links?: LinkExpression[]);
}
export declare class PerspectiveInput {
    links: LinkExpressionInput[];
}
declare const PerspectiveExpression_base: any;
export declare class PerspectiveExpression extends PerspectiveExpression_base {
}
export {};
