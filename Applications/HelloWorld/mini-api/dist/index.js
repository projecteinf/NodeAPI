"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./config/api");
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
const PORT = 3000;
const environment = (0, environment_1.getEnvironment)();
app.get("/", (_req, res) => {
    res.status(200).json({
        name: api_1.apiInfo.name,
        version: api_1.apiInfo.version,
        status: "OK",
        description: api_1.apiInfo.description,
        resources: api_1.apiInfo.resources,
        meta: {
            environment
        }
    });
});
app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
