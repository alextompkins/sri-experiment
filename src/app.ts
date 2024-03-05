import { mountServiceWorker } from './mountServiceWorker';

window.addEventListener('load', async () => {
  try {
    await mountServiceWorker();
  } catch (err) {
    console.error(err);
  }

  const { doThing } = await import('../cdn/doThing.js');
  doThing();
});
