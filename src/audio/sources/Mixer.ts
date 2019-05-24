import axios from 'axios';
import { Readable } from 'stream';
import { Parser } from 'm3u8-parser';
import m3u8stream = require('m3u8stream');
import AudioSource from './AudioSource';
import Track from '../Track';

export default class MixerAudioSource implements AudioSource {
	public async stream(track: Track): Promise<Readable> {
		const { data: { id } } = await axios(`https://mixer.com/api/v1/channels${track.url.pathname}?fields=id`);
		const parser = new Parser();
		const manifest = await axios(`https://mixer.com/api/v1/channels/${id}/manifest.m3u8?showAudioOnly=2`);
		parser.push(manifest.data);
		parser.end();

		const playlist = parser.manifest.playlists[0];
		if (!playlist) throw new Error('unable to find stream');
		return m3u8stream(playlist.uri);
	}
}
