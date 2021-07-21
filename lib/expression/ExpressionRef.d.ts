import type { Address } from '../Address';
import { LanguageRef } from '../language/LanguageRef';
export declare class ExpressionRef {
    language: LanguageRef;
    expression: Address;
    constructor(lang: LanguageRef, expr: Address);
}
export declare function exprRef2String(ref: ExpressionRef): string;
export declare function parseExprUrl(url: string): ExpressionRef;
