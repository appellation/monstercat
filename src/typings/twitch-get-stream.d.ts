declare module 'twitch-get-stream' {
  function getStream(clientID: string): { get: (channel: string) => Promise<{ url: string }[]> }
  export = getStream;
}
