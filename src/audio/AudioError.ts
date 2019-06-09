import { format } from 'util';

export enum AudioErrorCode {
	UNKNOWN_ERROR = 'An unknown error occurred: `%s`.',
	MISSING_PERMISSIONS = 'Unable to %s; please check your permissions.',
	NO_VC = 'You\'re not in a voice channel; please join one before trying to %s.',
}

export default class AudioError extends Error {
	constructor(code: AudioErrorCode, ...args: any[]) {
		super(format(code, ...args));
	}
}
