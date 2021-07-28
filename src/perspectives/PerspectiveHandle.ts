import { Neighbourhood } from "../neighbourhood/Neighbourhood"

// This type is used in the GraphQL interface to reference a mutable
// prespective that is implemented locally by the Ad4m runtime.

// The UUID is used in mutations to identify the perspective that gets mutated.
export class PerspectiveHandle {
    uuid: string

    name: string

    sharedUrl?: string

    neighbourhood?: Neighbourhood

    constructor(uuid?: string, name?: string) {
        this.uuid = uuid
        this.name = name
    }
}
