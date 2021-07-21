"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveHandle = void 0;
// This type is used in the GraphQL interface to reference a mutable
// prespective that is implemented locally by the Ad4m runtime.
// The UUID is used in mutations to identify the perspective that gets mutated.
class PerspectiveHandle {
    constructor(uuid, name) {
        this.uuid = uuid;
        this.name = name;
    }
}
exports.PerspectiveHandle = PerspectiveHandle;
