import Track from "../Track";
import { Readable } from "stream";

export type Streamable = Readable | string;

export default interface AudioSource {
	stream(track: Track): Promise<Streamable>;
}
