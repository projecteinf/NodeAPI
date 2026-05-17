"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = getEnvironment;
function getEnvironment() {
    const environment = process.env.NODE_ENV;
    if (environment === "development" ||
        environment === "test" ||
        environment === "production") {
        return environment;
    }
    return "development";
}
