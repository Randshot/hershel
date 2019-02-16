"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const serializers = {
    message: (msg) => ({
        id: msg.id,
        content: msg.content,
        author: msg.author.tag
    }),
    err: pino.stdSerializers.err
};
function createLogger(options) {
    if (!options)
        return abstract();
    if (typeof options === 'boolean')
        return pino();
    const stream = options.stream;
    delete options.stream;
    options.serializers = Object.assign({}, serializers, options.serializers);
    const prevLogger = options.logger;
    let logger;
    if (prevLogger) {
        options.logger = null;
        logger = prevLogger.child(options);
    }
    else {
        logger = pino(options, stream);
    }
    return logger;
}
exports.createLogger = createLogger;
function abstract() {
    let logger = Object.create(require('abstract-logging'));
    logger.child = () => logger;
    logger.level = 'abstract';
    return logger;
}
