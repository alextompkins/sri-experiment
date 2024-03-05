interface CdnAssetMeta {
  filename: string;
  sri: string;
  entrypoint?: boolean;
}

export interface Manifest {
  url: string;
  version: string;
  assets: CdnAssetMeta[];
}

export const manifest: Manifest = {
  url: 'http://localhost:5173/cdn',
  version: '2.1.3',
  assets: [
    {
      filename: 'doThing.js',
      sri: 'sha256-hash123',
      entrypoint: true,
    },
    {
      filename: 'doOtherThing.js',
      sri: 'sha256-O29P54LtBzO7q35B+bYr5e+Zwh7o/3vq56UPi5kREG4=',
      entrypoint: true,
    },
  ],
};
