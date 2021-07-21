import { Link } from "../links/Links";
export declare class LinkQuery {
    source?: string;
    target?: string;
    predicate?: string;
    fromDate?: Date;
    untilDate?: Date;
    constructor(obj: object);
    isMatch(l: Link): boolean;
}
