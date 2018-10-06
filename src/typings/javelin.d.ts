declare module 'javelin' {
  import { EventEmitter } from 'events';

  interface ClientOptions {
    oauth: string;
    username: string;
    channels?: string[];
  }

  class Message {
    constructor(client: Client, data: any);
    public readonly client: Client;
    public id: string;
    public content: string;
    public timestamp: number;
    public channel: Channel;
    public user: User;
    public readonly createdAt: Date;
    public readonly emotes: string[];
    public _emotes: string[];
  }

  class Channel {
    constructor(client: Client, data: any);
    public readonly client: Client;
    public id: number;
    public name: string;
    public emoteOnly: boolean;
    public followersOnly: number;
    public r9k: boolean;
    public rituals: boolean;
    public slowMode: number;
    public subsOnly: boolean;
    public send(message: string): void;
    public leave(): void;
  }

  class User {
    constructor(client: Client, data: any);
    public readonly client: Client;
    public id: number;
    public username: string;
    public displayName: string;
    public color: string;
    public badges: string[];
    public admin: boolean;
    public broadcaster: boolean;
    public globalMod: boolean;
    public moderator: boolean;
    public subscriber: boolean;
    public staff: boolean;
    public turbo: boolean;
    public prime: boolean;
  }

  class Client extends EventEmitter {
    constructor(options?: ClientOptions);
    public joinChannel(channel: string): void;
    public leaveChannel(channel: string): void;
    public login(): void;
    public destroy(): void;

    public on(event: 'debug', listener: (info: string) => void): this;
    public on(event: 'warn', listener: (info: string) => void): this;
    public on(event: 'error', listener: (error: Error) => void): this;
    public on(event: 'disconnect', listener: (error: Error) => void): this;
    public on(event: 'message', listener: (message: Message) => void): this;
    public on(event: 'channel_join', listener: (channel: Channel) => void): this;
    public on(event: 'channel_leave', listener: (channel: Channel) => void): this;
    public on(event: 'user_join', listener: (user: User, channel: Channel) => void): this;
    public on(event: 'user_leave', listener: (user: User, channel: Channel) => void): this;
    public on(event: string | symbol, listener: (...args: any[]) => void): this;
  }
}
