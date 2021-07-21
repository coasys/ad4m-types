"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveExpression = exports.PerspectiveInput = exports.Perspective = void 0;
const Expression_1 = require("../expression/Expression");
// A Perspective represents subjective meaning, encoded through
// associations between expressions, a.k.a. Links, that is a graph
// over the objective Expressions of any subset of Languages.
//
// This type represents the clean onotological concept of a Perspective.
// An instance of this class can be regarded as an immutable snapshot of 
// a mutable perspective.
//
// The other type PerspectiveHandle is used when dealing with an instantiated
// mutable perspective as is done through most of the GraphQL mutations.
class Perspective {
    constructor(links) {
        if (links) {
            this.links = links;
        }
        else {
            this.links = [];
        }
    }
}
exports.Perspective = Perspective;
class PerspectiveInput {
}
exports.PerspectiveInput = PerspectiveInput;
class PerspectiveExpression extends Expression_1.ExpressionGeneric(Perspective) {
}
exports.PerspectiveExpression = PerspectiveExpression;
;
