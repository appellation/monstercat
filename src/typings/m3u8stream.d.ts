declare module 'm3u8stream' {
	import { Readable } from "stream";

	function m3u8(url: string): Readable;
	export = m3u8;
}
