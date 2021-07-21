
import { Icon } from "../language/Icon";
import { LanguageRef } from "../language/LanguageRef";

export class ExpressionProof {
    signature: string;
    
    key: string;
    
    valid?: boolean;
    
    invalid?: boolean;

    constructor(sig: string, k: string) {
        this.key = k
        this.signature = sig
    }
}

export class ExpressionProofInput {
    signature: string;
    
    key: string;
    
    valid?: boolean;
    
    invalid?: boolean;
}

//Note having any as return type here fixes compilation errors but I think we loose the ExpressionClass type in resulting .d.ts gql files
export function ExpressionGeneric<DataType>(DataTypeClass: DataType): any {
    abstract class ExpressionClass {

        author: string;
    

        timestamp: string;
    
        data: DataType;
    

        proof: ExpressionProof;
        
        constructor(author: string, timestamp: string, data: DataType, proof: ExpressionProof) {
            this.author = author;
            this.timestamp = timestamp;
            this.data = data;
            this.proof = proof;
        }
    }
    return ExpressionClass;
}

export function ExpressionGenericInput<DataType>(DataTypeClass: DataType): any {
    abstract class ExpressionClass {

        author: string;
    

        timestamp: string;
    
        data: DataType;
    

        proof: ExpressionProofInput;
    }
    return ExpressionClass;
}

export class Expression extends ExpressionGeneric(Object) {};

export class ExpressionRendered extends ExpressionGeneric(String) {
    language: LanguageRef

    icon: Icon
};

export function isExpression(e: any): boolean {
    return e && e.author && e.timestamp && e.data
}
