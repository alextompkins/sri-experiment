import { Manifest } from './manifest';

interface SetupManifestMessage {
  messageType: 'setupManifest';
  manifest: Manifest;
}

export type Message = SetupManifestMessage;
