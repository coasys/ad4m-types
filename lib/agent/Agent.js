"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentExpression = exports.Agent = void 0;
const Perspective_1 = require("../perspectives/Perspective");
const Expression_1 = require("../expression/Expression");
// An Agent (as seen from other Agents)
// 
// 1. Is referenced by their DID 
// (and all epxressions authored by them are signed with the keys mentioned
// in the DID document)
// 
// 2. Holds and shares a Perspective that links all information
// this agent wants to offer as public-facing semantics.
// This should be used for any kind of user profile information.
//
// 3. A reference to the direct message language via which the agent
// is able to receive DMs.
class Agent {
    constructor(did, perspective) {
        this.did = did;
        if (perspective) {
            this.perspective = perspective;
        }
        else {
            this.perspective = new Perspective_1.Perspective();
        }
    }
}
exports.Agent = Agent;
class AgentExpression extends Expression_1.ExpressionGeneric(Agent) {
}
exports.AgentExpression = AgentExpression;
;
