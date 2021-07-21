"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeighbourhoodExpression = exports.Neighbourhood = void 0;
const Expression_1 = require("../expression/Expression");
class Neighbourhood {
    constructor(linkLanguage, meta) {
        this.linkLanguage = linkLanguage;
        this.meta = meta;
    }
}
exports.Neighbourhood = Neighbourhood;
class NeighbourhoodExpression extends Expression_1.ExpressionGeneric(Neighbourhood) {
}
exports.NeighbourhoodExpression = NeighbourhoodExpression;
;
