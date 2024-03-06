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
      sri: 'sha256-/rQ5rYwYg09wG/jnlsC8TtZW1hzpccgh7JnpaDMAF/M=',
      entrypoint: true,
    },
    {
      filename: 'subModule.js',
      sri: 'sha256-hpSs81nJ1MUCXLSokfxT+TTmxodz9LPyHX7ssF02W2Y=',
    },
  ],
};
