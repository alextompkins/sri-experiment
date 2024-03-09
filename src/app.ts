import { mountServiceWorker } from './mountServiceWorker';
import { Manifest } from './manifest';

const manifest: Manifest = {
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

window.addEventListener('load', async () => {
  await mountServiceWorker(manifest);

  try {
    const { doThing } = await import('../cdn/doThing.js');
    doThing();
  } catch (err) {
    console.error(err);
  }

  try {
    const { doOtherThing } = await import('../cdn/doOtherThing.js');
    doOtherThing();
  } catch (err) {
    console.error(err);
  }
});
