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
const avvio = require("avvio");
exports.registeredPlugins = Symbol.for('registered-plugin');
exports.displayName = Symbol.for('hershel.display-name');
exports.skipOverride = Symbol.for('skip-override');
exports.metadata = Symbol.for('plugin-metadata');
/**
 * Wrap client in avvio context
 * @param client client instance
 */
function createPluginInstance(client) {
    const app = avvio(client, { autostart: false, expose: { use: 'register' } });
    app.override = (old, fn) => {
        registerPluginName(old, fn);
        if (!!fn[exports.skipOverride])
            return old;
        const instance = Object.create(old);
        // @ts-ignore
        instance.middleware = old.middleware.slice();
        // @ts-ignore
        instance.custom = Object.create(old.custom);
        return instance;
    };
    client.started = false;
    app.onClose(() => __awaiter(this, void 0, void 0, function* () {
        app.started = false;
        yield client.destroy();
    }));
}
exports.createPluginInstance = createPluginInstance;
/**
 * Register plugins name inside client instance
 * @param client client instance
 * @param fn plugin function
 */
function registerPluginName(client, fn) {
    const meta = fn[exports.metadata];
    if (!meta)
        return;
    const name = meta.name;
    if (!name)
        return;
    client[exports.registeredPlugins].push(name);
}
