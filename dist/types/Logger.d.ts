/// <reference types="node" />
import * as stream from 'stream';
import * as pino from 'pino';
export declare namespace Logger {
    type logger = pino.Logger;
    type options = LoggerOption | boolean;
    interface LoggerOption extends pino.LoggerOptions {
        /** a writable stream where the logs will be written */
        stream?: stream.Duplex | stream.Writable | stream.Transform;
        /** reuses a pino logger instance */
        logger?: pino.Logger;
    }
}
