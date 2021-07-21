
import { ExpressionGeneric } from "../expression/Expression";
import { LinkExpression, LinkExpressionInput } from "../links/Links";

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
export class Perspective {
    links: LinkExpression[]

    constructor(links?: LinkExpression[]) {
        if(links) {
            this.links = links
        } else {
            this.links = []
        }
    }
}

export class PerspectiveInput {
    links: LinkExpressionInput[]
}

export class PerspectiveExpression extends ExpressionGeneric(Perspective) {};
