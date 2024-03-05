import { Manifest } from './manifest';
import { Message } from './messages';

const waitForServiceWorkerToBeReadyAndSetupManifest = async (manifest: Manifest) => {
  const activeReg = await navigator.serviceWorker.ready;

  await new Promise<void>((resolve) => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      const message: Message = event.data;

      if (message.messageType === 'confirmManifest') {
        resolve();
      }
    });

    if (!activeReg.active) throw Error('No active service worker');

    activeReg.active.postMessage({
      messageType: 'setupManifest',
      manifest,
    } satisfies Message);
  });

  console.log('Service worker ready', activeReg);
};

export const mountServiceWorker = async (manifest: Manifest) => {
  if (!('serviceWorker' in navigator)) {
    throw Error('Service Worker is not supported by browser.');
  }

  navigator.serviceWorker.addEventListener('controllerchange', async () => {
    await waitForServiceWorkerToBeReadyAndSetupManifest(manifest);
  });

  const reg = await navigator.serviceWorker.register('/integrityServiceWorker.ts', {
    scope: '/',
  });
  console.log('Service worker registered', reg);

  await waitForServiceWorkerToBeReadyAndSetupManifest(manifest);
};
