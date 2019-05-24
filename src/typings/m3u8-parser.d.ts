declare module 'm3u8-parser' {
	export interface Playlist {
		attributes: any;
		uri: string;
		timeline: number;
	}

	export interface Manifest {
		allowCache: boolean;
		endList: boolean;
		mediaSequence: number;
		discontinuitySequence: number;
		playlists: Playlist[];
	}

	export class Parser {
		public manifest: Manifest;
		public push(manifest: string): void;
		public end(): void;
	}
}
