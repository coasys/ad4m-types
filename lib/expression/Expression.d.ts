import { Icon } from "../language/Icon";
import { LanguageRef } from "../language/LanguageRef";
export declare class ExpressionProof {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;
    constructor(sig: string, k: string);
}
export declare class ExpressionProofInput {
    signature: string;
    key: string;
    valid?: boolean;
    invalid?: boolean;
}
export declare function ExpressionGeneric<DataType>(DataTypeClass: DataType): any;
export declare function ExpressionGenericInput<DataType>(DataTypeClass: DataType): any;
declare const Expression_base: any;
export declare class Expression extends Expression_base {
}
declare const ExpressionString_base: any;
export declare class ExpressionString extends ExpressionString_base {
}
declare const ExpressionRendered_base: any;
export declare class ExpressionRendered extends ExpressionRendered_base {
    language: LanguageRef;
    icon: Icon;
}
export declare function isExpression(e: any): boolean;
export {};
