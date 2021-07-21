"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unwrapApolloResult(result) {
    //console.debug('GQL result:', result)
    //@ts-ignore
    if (result.error) {
        //@ts-ignore
        throw result.error;
    }
    //@ts-ignore
    if (result.errors) {
        //@ts-ignore
        throw result.errors;
    }
    return result.data;
}
exports.default = unwrapApolloResult;
