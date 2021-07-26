"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpression = exports.ExpressionRendered = exports.ExpressionString = exports.Expression = exports.ExpressionGenericInput = exports.ExpressionGeneric = exports.ExpressionProofInput = exports.ExpressionProof = void 0;
class ExpressionProof {
    constructor(sig, k) {
        this.key = k;
        this.signature = sig;
    }
}
exports.ExpressionProof = ExpressionProof;
class ExpressionProofInput {
}
exports.ExpressionProofInput = ExpressionProofInput;
//Note having any as return type here fixes compilation errors but I think we loose the ExpressionClass type in resulting .d.ts gql files
function ExpressionGeneric(DataTypeClass) {
    class ExpressionClass {
        constructor(author, timestamp, data, proof) {
            this.author = author;
            this.timestamp = timestamp;
            this.data = data;
            this.proof = proof;
        }
    }
    return ExpressionClass;
}
exports.ExpressionGeneric = ExpressionGeneric;
function ExpressionGenericInput(DataTypeClass) {
    class ExpressionClass {
    }
    return ExpressionClass;
}
exports.ExpressionGenericInput = ExpressionGenericInput;
class Expression extends ExpressionGeneric(Object) {
}
exports.Expression = Expression;
;
class ExpressionString extends ExpressionGeneric(String) {
}
exports.ExpressionString = ExpressionString;
;
class ExpressionRendered extends ExpressionGeneric(String) {
}
exports.ExpressionRendered = ExpressionRendered;
;
function isExpression(e) {
    return e && e.author && e.timestamp && e.data;
}
exports.isExpression = isExpression;
