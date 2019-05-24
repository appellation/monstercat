import Track from "../Track";
import { Readable } from "stream";

export default interface AudioSource {
	stream(track: Track): Promise<Readable>;
}
