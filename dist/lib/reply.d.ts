import * as discord from 'discord.js';
import { Reply } from '../types/Reply';
declare class Reply extends discord.RichEmbed {
    private _response;
    private _type;
    private _message;
    private _sent;
    constructor({ data, msg }: Reply.Options);
    setMessage: (description: any) => this;
    /**
     * Set reply type
     * @param type reply type (string or embed)
     */
    setType(type: Reply.type): this;
    /**
     * Send reply
     * @param options message options
     */
    send(options?: discord.MessageOptions): Promise<discord.Message>;
    /**
     * Update response
     * @param options message edit options
     */
    update(options?: discord.MessageEditOptions): Promise<discord.Message>;
    /**
     * Get message payload
     */
    payload(): string | discord.RichEmbed;
    /**
     * Reset reply
     * @param data properties to set
     */
    reset(data?: discord.RichEmbedOptions): void;
    readonly type: Reply.type;
    readonly sent: boolean;
    readonly response: discord.Message;
    readonly message: discord.Message;
}
export { Reply };
export declare const createReplyFactory: (data?: Reply.Data) => (msg: discord.Message) => (override?: Reply.Data) => Reply;
