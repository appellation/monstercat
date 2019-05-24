import { ClientVoiceManager } from 'discord.js';
import BroadcastStream from "./BroadcastStream";
import Track from './Track';
import Sources from './Sources';

export enum Broadcast {
	UNCAGED,
}

export default class Broadcasts extends Map<Broadcast, BroadcastStream> {
	constructor(public voice: ClientVoiceManager, public sources: Sources) {
		super();
		this.set(Broadcast.UNCAGED, this.createStream('https://mixer.com/monstercat'));
	}

	public createStream(query: string): BroadcastStream {
		return new BroadcastStream(this.voice.createBroadcast(), Track.resolve(this.sources, query));
	}
}
