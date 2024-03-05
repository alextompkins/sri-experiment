import { manifest } from './manifest';
import { Message } from './messages';

const waitForServiceWorkerToBeReadyAndSetupManifest = async () => {
  const activeReg = await navigator.serviceWorker.ready;
  if (!activeReg.active) throw Error('No active service worker');

  console.log('Service worker ready', activeReg);

  activeReg.active.postMessage({
    messageType: 'setupManifest',
    manifest,
  } satisfies Message);
};

export const mountServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw Error('Service Worker is not supported by browser.');
  }

  navigator.serviceWorker.addEventListener('controllerchange', async () => {
    await waitForServiceWorkerToBeReadyAndSetupManifest();
  });

  const reg = await navigator.serviceWorker.register('/integrityServiceWorker.ts', {
    scope: '/',
  });
  console.log('Service worker registered', reg);

  await waitForServiceWorkerToBeReadyAndSetupManifest();
};
