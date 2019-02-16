import * as discord from 'discord.js';
export declare namespace Reply {
    type type = 'string' | 'embed';
    interface Data extends discord.RichEmbedOptions {
        type?: type;
    }
    interface Options {
        data?: Data;
        msg: discord.Message;
    }
}
