import twitchStream, { Client } from "twitch-get-stream";
import m3u8stream = require('m3u8stream');
import { Readable } from "stream";
import AudioSource from "./AudioSource";
import Track from "../Track";

export default class TwitchAudioSource implements AudioSource {
	public client: Client;

	constructor(clientID: string) {
		this.client = twitchStream(clientID);
	}

	public async stream(track: Track): Promise<Readable> {
		const streams = await this.client.get(track.url.pathname);
		const stream = streams.find(s => !s.resolution) || streams[0];
		if (!stream) throw new Error(`unable to find stream for URL ${track.url}`);
		return m3u8stream(stream.url);
	}
}
