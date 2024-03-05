import { mountServiceWorker } from './mountServiceWorker';
import { manifest } from './manifest';

window.addEventListener('load', async () => {
  try {
    await mountServiceWorker(manifest);
  } catch (err) {
    console.error(err);
  }

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
