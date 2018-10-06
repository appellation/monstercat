import { Node, Player } from 'lavalink';
import UncagedStream from './streams/Uncaged';
import InstinctStream from './streams/Instinct';

export enum StreamType {
  INSTINCT,
  UNCAGED,
}

export default class Streams {
  public uncaged: UncagedStream;
  public instinct: InstinctStream;

  constructor(lavalink: Node) {
    this.uncaged = new UncagedStream(lavalink);
    this.instinct = new InstinctStream(lavalink);
  }

  public play(type: StreamType, player: Player) {
    switch (type) {
      case StreamType.INSTINCT:
        return this.instinct.play(player);
      case StreamType.UNCAGED:
        return this.uncaged.play(player);
      default:
        throw new Error(`unknown stream type "${type}"`);
    }
  }
}
