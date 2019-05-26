import axios from 'axios';
import { Parser } from 'm3u8-parser';
import AudioSource from './AudioSource';
import Track from '../Track';

export default class MixerAudioSource implements AudioSource {
	public async stream(track: Track): Promise<string> {
		const { data: { id } } = await axios(`https://mixer.com/api/v1/channels${track.url.pathname}?fields=id`);
		const parser = new Parser();
		const manifest = await axios(`https://mixer.com/api/v1/channels/${id}/manifest.m3u8?showAudioOnly=2`);
		parser.push(manifest.data);
		parser.end();

		const playlist = parser.manifest.playlists[0];
		if (!playlist) throw new Error('unable to find stream');
		return playlist.uri;
	}
}
