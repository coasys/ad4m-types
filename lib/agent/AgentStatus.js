"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStatus = void 0;
class AgentStatus {
    constructor(obj) {
        if (obj) {
            //@ts-ignore
            this.isInitialized = obj.isInitialized;
            if (!this.isInitialized) {
                this.isInitialized = false;
            }
            //@ts-ignore
            this.isUnlocked = obj.isUnlocked;
            if (!this.isUnlocked) {
                this.isUnlocked = false;
            }
            //@ts-ignore
            this.did = obj.did;
            //@ts-ignore
            this.didDocument = obj.didDocument;
            //@ts-ignore
            this.error = obj.error;
        }
        else {
            this.isInitialized = false;
            this.isUnlocked = false;
        }
    }
}
exports.AgentStatus = AgentStatus;
