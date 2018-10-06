import Node, { Player } from 'lavalink';

export default abstract class Stream {
  public abstract readonly url: string;
  public track?: string;

  constructor(public readonly lavalink: Node) {}

  public async play(player: Player) {
    const track = await this.fetchTrack();
    return player.play(track);
  }

  public async fetchTrack(): Promise<string> {
    if (this.track) return this.track;

    const res: any = await this.lavalink.load(this.url);
    return this.track = res.tracks[0].track;
  }
}
