"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkQuery = void 0;
class LinkQuery {
    constructor(obj) {
        if (obj) {
            // @ts-ignore
            this.source = obj.source;
            // @ts-ignore
            this.predicate = obj.predicate;
            // @ts-ignore
            this.target = obj.target;
            // @ts-ignore
            if (obj.fromDate) {
                // @ts-ignore
                this.fromDate = obj.fromDate;
            }
            ;
            // @ts-ignore
            if (obj.untilDate) {
                // @ts-ignore
                this.untilDate = obj.untilDate;
            }
        }
    }
    isMatch(l) {
        if (this.source)
            if (this.source !== l.source)
                return false;
        if (this.predicate)
            if (this.predicate !== l.predicate)
                return false;
        if (this.target)
            if (this.target !== l.target)
                return false;
        return true;
    }
}
exports.LinkQuery = LinkQuery;
