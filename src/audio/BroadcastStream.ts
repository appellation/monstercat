import { BroadcastDispatcher, StreamDispatcher, VoiceBroadcast, VoiceConnection } from 'discord.js';
import { Signale } from 'signale';
import Track from './Track';
import { Streamable } from './sources/AudioSource';

export default class BroadcastStream {
	public readonly logger: Signale = new Signale({ scope: 'broadcast stream' });

	protected _stream?: Streamable;
	protected _dispatcher?: BroadcastDispatcher;
	protected _listeners = {
		error: (error: Error) => {
			this.logger.warn(error);
			this.start();
		},
		finish: () => {
			this.logger.info('closed');
			this.start();
		},
		debug: (info: string) => {
			this.logger.debug('[debug]', info);
		},
	};

	constructor(public readonly broadcast: VoiceBroadcast, public readonly track: Track) {
		this.start().catch(e => this.logger.error(e));
	}

	public async start(): Promise<void> {
		if (this._dispatcher) this._removeListeners();

		if (this._stream && typeof this._stream === 'object') this._stream.destroy();
		this._stream = await this.track.stream();

		this._dispatcher = this.broadcast.play(this._stream, { highWaterMark: 50, volume: false });
		this._registerListeners();

		this.logger.info('started track %s', this.track.url);
	}

	public to(vc: VoiceConnection): StreamDispatcher {
		const dispatcher = vc.play(this.broadcast);
		this.logger.debug('playing on %s', vc.channel.id);
		return dispatcher;
	}

	protected _registerListeners() {
		if (!this._dispatcher) return;

		for (const [evt, listener] of Object.entries(this._listeners)) {
			if (!this._dispatcher.listeners(evt).includes(listener)) this._dispatcher.on(evt, listener);
		}
	}

	protected _removeListeners() {
		if (!this._dispatcher) return;

		for (const [evt, listener] of Object.entries(this._listeners)) {
			this._dispatcher.off(evt, listener);
		}
	}
}
