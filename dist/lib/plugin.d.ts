import { Client } from '../Client';
export declare const registeredPlugins: unique symbol;
export declare const displayName: unique symbol;
export declare const skipOverride: unique symbol;
export declare const metadata: unique symbol;
/**
 * Wrap client in avvio context
 * @param client client instance
 */
export declare function createPluginInstance(client: Client): void;
