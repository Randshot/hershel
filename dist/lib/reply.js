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
const discord = require("discord.js");
const ow_1 = require("ow");
class Reply extends discord.RichEmbed {
    constructor({ data, msg }) {
        super(data);
        this._response = null;
        this._type = 'embed';
        this._sent = false;
        this.setMessage = this.setDescription;
        if (data.type)
            this.setType(data.type);
        this._message = msg;
    }
    /**
     * Set reply type
     * @param type reply type (string or embed)
     */
    setType(type) {
        ow_1.default(type, ow_1.default.string.oneOf(['string', 'embed']));
        this._type = type;
        return this;
    }
    /**
     * Send reply
     * @param options message options
     */
    send(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._sent)
                throw new Error('Cannot send reply twice. Use `update`');
            const payload = this.payload();
            if (!payload) {
                throw new Error('Cannot send reply while its payload is empty');
            }
            this._sent = true;
            this._response = (yield this._message.channel.send(payload, options));
            return this._response;
        });
    }
    /**
     * Update response
     * @param options message edit options
     */
    update(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._sent) {
                throw new Error('Cannot update unsent message. Use `.send()`');
            }
            const payload = this.payload();
            if (!payload) {
                throw new Error('Cannot update reply while its payload is empty');
            }
            return this._response.edit(payload, options);
        });
    }
    /**
     * Get message payload
     */
    payload() {
        const type = this._type;
        return type === 'embed' ? new discord.RichEmbed(this) : this.description;
    }
    /**
     * Reset reply
     * @param data properties to set
     */
    reset(data = {}) {
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.color = data.color;
        this.author = data.author;
        this.timestamp = data.timestamp;
        this.fields = data.fields || [];
        this.thumbnail = data.thumbnail;
        this.image = data.image;
        this.footer = data.footer;
        this.file = data.file;
    }
    get type() {
        return this._type;
    }
    get sent() {
        return this._sent;
    }
    get response() {
        return this._response;
    }
    get message() {
        return this._message;
    }
}
exports.Reply = Reply;
exports.createReplyFactory = (data) => (msg) => (override) => new Reply({ data: Object.assign({}, data, override), msg });
