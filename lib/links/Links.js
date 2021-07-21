"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashLinkExpression = exports.isLink = exports.linkEqual = exports.LinkExpressionInput = exports.LinkExpression = exports.LinkInput = exports.Link = void 0;
const Expression_1 = require("../expression/Expression");
class Link {
    constructor(obj) {
        this.source = obj.source ? obj.source : '';
        this.target = obj.target ? obj.target : '';
        this.predicate = obj.predicate ? obj.predicate : '';
    }
}
exports.Link = Link;
class LinkInput {
}
exports.LinkInput = LinkInput;
class LinkExpression extends Expression_1.ExpressionGeneric(Link) {
}
exports.LinkExpression = LinkExpression;
;
class LinkExpressionInput extends Expression_1.ExpressionGenericInput(LinkInput) {
}
exports.LinkExpressionInput = LinkExpressionInput;
;
function linkEqual(l1, l2) {
    return l1.author == l2.author &&
        l1.timestamp == l2.timestamp &&
        l1.data.source == l2.data.source &&
        l1.data.predicate == l2.data.predicate &&
        l1.data.target == l2.data.target;
}
exports.linkEqual = linkEqual;
function isLink(l) {
    return l && l.source && l.target;
}
exports.isLink = isLink;
function hashLinkExpression(link) {
    const mash = JSON.stringify(link.data, Object.keys(link.data).sort()) +
        JSON.stringify(link.author) + link.timestamp;
    let hash = 0, i, chr;
    for (i = 0; i < mash.length; i++) {
        chr = mash.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.hashLinkExpression = hashLinkExpression;
