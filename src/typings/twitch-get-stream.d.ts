declare module 'twitch-get-stream' {
	export default function ClientFactory(clientID: string): Client;

	export interface Stream {
		quality: string;
		resolution: string | null;
		url: string;
	}

	export interface Client {
		get(channel: string): Promise<Stream[]>;
	}
}
