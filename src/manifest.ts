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
