declare module 'm3u8stream' {
  import * as stream from 'stream';
  function getStream(url: string): stream.Readable;
  export = getStream;
}
