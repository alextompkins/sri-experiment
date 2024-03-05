import { Message } from './src/messages';
import { Manifest } from './src/manifest';

const context = self as unknown as ServiceWorkerGlobalScope;

let manifest: Manifest | undefined = undefined;

const stripQueryParams = (url: string) => {
  const queryParamsIndex = url.indexOf('?');

  if (queryParamsIndex === -1) return url;

  return url.slice(0, queryParamsIndex);
};

context.addEventListener('install', async (event) => {
  console.log('WORKER: install event in progress.');
  await context.skipWaiting();
});

context.addEventListener('activate', async (event) => {
  console.log('WORKER: activate event in progress.');
  event.waitUntil(context.clients.claim());
});

context.addEventListener('message', async (event) => {
  const message: Message = event.data;

  if (message.messageType === 'setupManifest') {
    manifest = message.manifest;

    const activeClient = (await context.clients.matchAll())[0];

    if (!activeClient) throw Error('No active client, cannot confirm manifest setup');

    activeClient.postMessage({ messageType: 'confirmManifest' } satisfies Message);

    console.log('set up manifest inside service worker');
  }
});

context.addEventListener('fetch', (event) => {
  const request = event.request;

  if (!manifest) {
    console.error('Cannot intercept fetch properly as we have not received a manifest yet!');
    return;
  }

  // Only handle requests for the domain specified in the manifest
  if (!request.url.startsWith(manifest.url)) return;

  const matchingMetadataEntry = manifest.assets.find(
    (assetMeta) => `${manifest?.url}/${assetMeta.filename}` === stripQueryParams(request.url),
  );

  if (!matchingMetadataEntry) {
    console.log('no matching entry', request.url);
    const abortController = new AbortController();
    abortController.abort('No SRI hash provided');

    event.respondWith(fetch(request, { signal: abortController.signal }));
    return;
  }

  console.log(
    `Intercepted request for "${matchingMetadataEntry.filename}", setting integrity on request: ${matchingMetadataEntry.sri}`,
  );

  const fetchOptions: RequestInit = {
    integrity: matchingMetadataEntry.sri,
    method: request.method,
    mode: 'cors', // if we have integrity metadata, it should also use cors
    credentials: 'omit', // ...and omit credentials
    cache: 'default',
  };

  event.respondWith(fetch(request, fetchOptions));
});
