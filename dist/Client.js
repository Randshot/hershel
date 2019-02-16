"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
"use strict";
const discord = require("discord.js");
const compose = require("koa-compose");
const ow_1 = require("ow");
const lib_1 = require("./lib");
const plugin_1 = require("./lib/plugin");
class Client extends discord.Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions);
        this.middleware = [];
        this.custom = {};
        /**
         * Custom error handler
         */
        this.handleError = null;
        this[_a] = [];
        ow_1.default(options, 'options', ow_1.default.object);
        this.config = options;
        this.logger = lib_1.createLogger(options.logger);
        lib_1.createPluginInstance(this);
        this.once('ready', this.onReadyEvent);
    }
    /**
     * Add middleware
     * @param fn middleware function
     */
    use(fn) {
        this.throwIfAlreadyStarted('Cannot add new middleware');
        ow_1.default(fn, 'middleware', ow_1.default.function);
        this.middleware.push(fn);
        return this;
    }
    /**
     * Decorate client with custom properties
     * @param key key to the custom property
     * @param value value of said property
     */
    set(key, value) {
        if (this.has(key))
            throw new Error(`\`${key}\` key already exists`);
        this.custom[key] = value;
    }
    /**
     * Get custom property
     * @param key property key to get
     */
    get(key) {
        if (this.has(key))
            return this.custom[key];
        return null;
    }
    /**
     * Check if client has specific key
     * @param key property key to check
     */
    has(key) {
        return this.custom.hasOwnProperty(key);
    }
    /**
     * Set new error handler function
     * @param fn error handler function
     */
    setErrorHandler(fn) {
        this.throwIfAlreadyStarted('Cannot set error handler');
        ow_1.default(fn, 'error handler', ow_1.default.function);
        this.handleError = fn;
    }
    /**
     * Internal handler for the 'ready' event
     */
    onReadyEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = this.user ? this.user.tag : 'TEST MODE';
            this.logger.info(`connected to Discord as ${name}`);
            yield this.ready();
            const composed = yield compose(this.middleware);
            this.started = true;
            const createReply = lib_1.createReplyFactory(this.config.reply);
            const genId = this.config.genId
                ? this.config.genId
                : (msg) => msg.id;
            this.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                let ctx = {};
                //#region create context
                ctx.id = genId(message);
                ctx.logger = this.logger.child({ id: ctx.id });
                ctx.message = message;
                ctx.app = this;
                ctx.state = {};
                ctx.createReply = createReply(message);
                //#endregion
                ctx.logger.trace({ message }, 'message incoming');
                composed(ctx)
                    .then(() => this.middlewareCallback(ctx, null))
                    .catch(err => this.middlewareCallback(ctx, err));
            }));
        });
    }
    /**
     * Middleware callback
     * @param err error
     */
    middlewareCallback({ logger }, err) {
        if (err) {
            logger.error({ err }, 'middleware process ended with an error');
            if (this.handleError)
                return this.handleError(err);
        }
    }
    /**
     * Throw error if client is already started
     * @param msg error message to throw
     */
    throwIfAlreadyStarted(msg) {
        if (this.started)
            throw new Error(`${msg} while client is already started`);
    }
}
_a = plugin_1.registeredPlugins;
exports.Client = Client;
