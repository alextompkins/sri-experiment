import { Manifest } from './manifest';

interface SetupManifestMessage {
  messageType: 'setupManifest';
  manifest: Manifest;
}

interface ConfirmManifestMessage {
  messageType: 'confirmManifest';
}

export type Message = SetupManifestMessage | ConfirmManifestMessage;
