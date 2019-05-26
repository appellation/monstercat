import { BroadcastDispatcher, StreamDispatcher, VoiceBroadcast, VoiceConnection } from 'discord.js';
import { Readable } from 'stream';
import { Signale } from 'signale';
import Track from './Track';

export default class BroadcastStream {
	public readonly logger: Signale = new Signale({ scope: 'broadcast stream' });

	protected _stream?: Readable;
	protected _dispatcher?: BroadcastDispatcher;
	protected _listeners = {
		error: (error: Error) => {
			this.logger.warn(error);
			this.start();
		},
		close: () => {
			this.logger.info('closed');
			this.start();
		},
		debug: (info: string) => {
			this.logger.debug('[debug]', info);
		},
	};

	constructor(public readonly broadcast: VoiceBroadcast, public readonly track: Track) {
		this.start();
	}

	public async start(): Promise<void> {
		if (!this._stream) this._stream = await this.track.stream();
		if (this._dispatcher) this._removeListeners();

		this._dispatcher = this.broadcast.play(this._stream);
		this._registerListeners();

		this.logger.info('started track %s', this.track.url);
	}

	public to(vc: VoiceConnection): StreamDispatcher {
		const dispatcher = vc.play(this.broadcast);
		dispatcher.on('error', (error) => {
			this.logger.warn(error);
			// do nothing: handled by broadcast error handler
		});

		dispatcher.on('debug', (info) => {
			this.logger.debug('[debug]', info);
		});

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
