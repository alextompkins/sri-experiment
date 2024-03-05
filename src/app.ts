import { mountServiceWorker } from './mountServiceWorker';
import { manifest } from './manifest';

window.addEventListener('load', async () => {
  try {
    await mountServiceWorker(manifest);
  } catch (err) {
    console.error(err);
  }

  const { doThing } = await import('../cdn/doThing.js');
  doThing();
});
