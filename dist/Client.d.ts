import * as discord from 'discord.js';
import * as avvio from 'avvio';
import * as pino from 'pino';
import { registeredPlugins } from './lib/plugin';
import { Application as App } from './types';
export declare class Client extends discord.Client {
    private middleware;
    private custom;
    private config;
    logger: pino.Logger;
    constructor(options?: App.Options, clientOptions?: discord.ClientOptions);
    /**
     * Add middleware
     * @param fn middleware function
     */
    use(fn: App.middleware): this;
    /**
     * Decorate client with custom properties
     * @param key key to the custom property
     * @param value value of said property
     */
    set(key: string, value: any): void;
    /**
     * Get custom property
     * @param key property key to get
     */
    get<T = any>(key: string): T;
    /**
     * Check if client has specific key
     * @param key property key to check
     */
    has(key: string): boolean;
    /**
     * Set new error handler function
     * @param fn error handler function
     */
    setErrorHandler(fn: (err: Error) => void): void;
    /**
     * Internal handler for the 'ready' event
     */
    private onReadyEvent;
    /**
     * Middleware callback
     * @param err error
     */
    private middlewareCallback;
    /**
     * Custom error handler
     */
    private handleError;
    /**
     * Throw error if client is already started
     * @param msg error message to throw
     */
    private throwIfAlreadyStarted;
    [registeredPlugins]: string[];
}
export interface Client {
    after: avvio.After<this>;
    ready: avvio.Ready<this>;
    close: avvio.Close<this>;
    register: avvio.Use<this>;
    onClose: avvio.OnClose<this>;
    started: boolean;
}
