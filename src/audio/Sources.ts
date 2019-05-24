import AudioSource from './sources/AudioSource';
import MixerAudioSource from './sources/Mixer';

export interface SourcesOptions {
	twitch: { clientID: string };
}

export enum SourceType {
	// TWITCH,
	// YOUTUBE,
	MIXER,
}

export default class Sources extends Map<SourceType, AudioSource> {
	constructor() {
		super([
			[SourceType.MIXER, new MixerAudioSource()],
		]);
	}

	public get(key: SourceType): AudioSource {
		return super.get(key)!;
	}
}
