import { StreamDispatcher, VoiceBroadcast, VoiceConnection } from 'discord.js';
import Track from './Track';

export default class BroadcastStream {
	constructor(public readonly broadcast: VoiceBroadcast, track: Track) {
		track.stream().then(stream => {
			broadcast.play(stream);
			broadcast.on('error', (error) => {
				console.warn('[broadcast]', error);
				broadcast.play(stream);
			});
		});
	}

	public to(vc: VoiceConnection): StreamDispatcher {
		const dispatcher = vc.play(this.broadcast);
		dispatcher.on('error', (error) => {
			console.warn('[dispatcher]', error);
			// do nothing: handled by broadcast error handler
		});
		return dispatcher;
	}
}
