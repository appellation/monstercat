import { URL } from "url";
import AudioSource, { Streamable } from "./sources/AudioSource";
import Sources, { SourceType } from "./Sources";

export default class Track {
	public static resolve(sources: Sources, query: string): Track {
		const url = new URL(query);
		switch (url.hostname) {
			// case 'twitch.tv':
			// 	return new this(sources.get(SourceType.TWITCH), url);
			case 'mixer.com':
				return new this(sources.get(SourceType.MIXER), url);
		}

		throw new Error('unresolvable track');
	}

	public readonly url: URL;
	public readonly source: AudioSource;

	constructor(source: AudioSource, url: URL) {
		this.source = source;
		this.url = url;
	}

	public async stream(): Promise<Streamable> {
		return this.source.stream(this);
	}
}
